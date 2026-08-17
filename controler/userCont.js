import User from "../model/model.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const register=async (req,res)=>{
try {
    
    const {email,password,userName}=req.body

if(!email || !password||!userName){
    return res.status(400).json({
        masssage:"email and password and userName required"
})
}

const exist = await User.findOne({email});
if (exist) {
    return res.status(400).json({
        masssage:"email allready existing"
    })
}
const hashing= await bcrypt.hash(password,10);
const user=await User.create({
    email,
    password:hashing,
    userName
})

const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
);

res.status(201).json({
    masssage:"user registre succesfully",
    token:token,
    user:{
        id:user._id,
        email:user.email,
        userName:user.userName
    }
})

} catch (error) {
    console.log("error",error);
    res.status(500).json({
        masssage:"servre error"
    })
}
}





const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
);

        res.status(200).json({
            message: "Login successful",
            token:token,
            user: {
                id: user._id,
                email: user.email,
                userName: user.userName
            }
        });

    } catch (error) {
        console.log("error", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};




const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile successful",
            user
        });

    } catch (error) {
        console.log("Profile error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export { register, login, profile };


