
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Mail, User, Lock, Github, Loader2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SPECIALIZATION_OPTIONS = [
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Real Estate Law",
  "Civil Rights",
  "Immigration Law",
  "Personal Injury",
  "Intellectual Property"
];

const Register = () => {
  const [userType, setUserType] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [barId, setBarId] = useState("");
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload: any = {
        name: `${firstName} ${lastName}`.trim(),
        email,
        password,
        role: userType,
      };

      if (userType === 'lawyer') {
        payload.bar_id = barId;        payload.specializations = specializations;      }

      const { data } = await axios.post("http://localhost:5000/api/auth/register", payload);

      login(data);

      toast({
        title: "Registration Successful",
        description: `Welcome! Your account has been created successfully.`,
      });

      navigate("/"); // Redirect to home
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    toast({
      title: "Google Registration",
      description: "Google registration functionality will be implemented",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link to="/" className="flex items-center mb-8">
              <span className="text-2xl font-bold text-legal-blue">
                Nyaya<span className="text-legal-gold">.Ai</span>
              </span>
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                to="/login"
                className="font-medium text-legal-blue hover:text-legal-gold"
              >
                sign in to your account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {/* <Button
              onClick={handleGoogleRegister}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Github size={18} />
              <span>Sign up with Google</span>
            </Button>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-gray-50">
                  Or continue with
                </span>
              </div>
            </div> */}

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <Label htmlFor="user-type">I am registering as a</Label>
                <Select
                  value={userType}
                  onValueChange={(value) => setUserType(value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Regular User</SelectItem>
                    <SelectItem value="lawyer">Lawyer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="first-name">First name</Label>
                  <div className="relative mt-1">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      id="first-name"
                      name="first-name"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="last-name">Last name</Label>
                  <div className="relative mt-1">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      id="last-name"
                      name="last-name"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="relative mt-1">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {userType === "lawyer" && (
                <>
                  <div>
                    <Label htmlFor="bar-id">Bar ID</Label>
                    <div className="relative mt-1">
                      <Input
                        id="bar-id"
                        name="bar-id"
                        type="text"
                        required
                        value={barId}
                        onChange={(e) => setBarId(e.target.value)}
                        placeholder="10-digit alphanumeric ID"
                        pattern="^[a-zA-Z0-9]{10}$"
                        title="Bar ID must be 10 characters (letters and numbers only)"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Please enter your 10-digit alphanumeric Bar ID
                    </p>
                  </div>

                  <div>
                    <Label>Specializations (Max 3)</Label>
                    
                    {specializations.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 mb-2">
                        {specializations.map((spec) => (
                          <div 
                            key={spec} 
                            className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-yellow-800 rounded-full text-sm font-medium border border-yellow-200"
                          >
                            <span>{spec}</span>
                            <button
                              type="button"
                              onClick={() => setSpecializations(specializations.filter((s) => s !== spec))}
                              className="text-yellow-700 hover:text-red-500 focus:outline-none"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {specializations.length < 3 && (
                      <Select 
                        onValueChange={(val) => {
                          if (val && !specializations.includes(val) && specializations.length < 3) {
                            setSpecializations([...specializations, val]);
                          }
                        }}
                      >
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Select a specialization..." />
                        </SelectTrigger>
                        <SelectContent>
                          {SPECIALIZATION_OPTIONS.filter(spec => !specializations.includes(spec)).map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm password</Label>
                <div className="relative mt-1">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full bg-legal-blue" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Create Account"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-l from-legal-blue to-legal-gold opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">
            Join the largest legal community
          </h2>
          <p className="text-lg">
            Create an account to get personalized legal advice, connect with
            lawyers, and access resources to help with your legal matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
