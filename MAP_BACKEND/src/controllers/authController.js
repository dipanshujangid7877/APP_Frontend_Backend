import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Otp from '../models/otp.js';

export const registerUser = async (req, res) => {
    const {name, email,otp, password} = req.body;
    console.log(req.body);

    try{
        const recentOtp = await Otp.findOne({ email }).sort({createdAt: -1});

        if (!recentOtp || recentOtp.otp !== otp) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "user already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        const token = jwt.sign({id: savedUser._id, email: savedUser.email},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        };
        res
        .status(201)
        .cookie('token', token, options)
        .json({
            success: true,
            message: 'user register succesfully',
            user: savedUser,
            token
        })
    }catch(error){
        console.error('error registring user: ', error.message) ;
        return res.status(500).json({message: 'Internal error'});
    }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id:user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        };

        res.status(201)
        .cookie('token', token, options)
        .json({
            success: true,
            message: 'user loginsuccesfully',
            token,
            user: user
        });

    }catch(error){
        console.error('login error', error.message);
        res.status(500).json({message: 'Internal error'});
    }
}