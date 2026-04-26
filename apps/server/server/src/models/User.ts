import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum Role {
  USER = 'user',
  LAWYER = 'lawyer',
}

export enum LawyerStatus {
  SUBMITTED = 'submitted',
  UNDER_SCRUTINY = 'under_scrutiny',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: Role;
  bar_id?: string;
  application_status?: LawyerStatus;
  specializations?: string[];
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    // Only required if role is lawyer
    bar_id: { type: String },
    application_status: {
      type: String,
      enum: Object.values(LawyerStatus),
    },
    specializations: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  if (this.password) {
      this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
