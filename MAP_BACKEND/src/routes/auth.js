import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import {sendOtp} from '../controllers/otpController.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.post('/send-otp', sendOtp);

export default router;