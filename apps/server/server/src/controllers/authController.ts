import { Request, Response } from 'express';
import { User, Role, LawyerStatus } from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, bar_id, specializations } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (role === Role.LAWYER) {
      if (!bar_id) {
        return res.status(400).json({ message: 'bar_id is required for lawyer registration' });
      }
      
      const user = await User.create({
        name,
        email,
        password,
        role: Role.LAWYER,
        bar_id,
        specializations: specializations || [],
        application_status: LawyerStatus.SUBMITTED
      });
      
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        application_status: user.application_status,
        token: generateToken(user._id as string),
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: Role.USER,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id as string),
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        application_status: user.application_status,
        token: generateToken(user._id as string),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
