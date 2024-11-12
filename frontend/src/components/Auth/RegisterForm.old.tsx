import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await register(formData);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Display success or error messages */}
      {success && (
        <div className="text-green-500 text-sm text-center mb-4">{success}</div>
      )}
      {error && (
        <div className="text-red-500 text-sm text-center mb-4">{error}</div>
      )}

      <Card className="mx-auto max-w-sm w-screen">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription>
            {/* Please enter your credentials to login to your account */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={handleChange}
                id="username"
                name="username"
                type="text"
                value={formData.username}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Email</Label>
              </div>
              <Input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                value={formData.email}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                value={formData.password}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">First Name</Label>
              </div>
              <Input
                onChange={handleChange}
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Last Name</Label>
              </div>
              <Input
                onChange={handleChange}
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Phone</Label>
              </div>
              <Input
                onChange={handleChange}
                id="phone_number"
                name="phone_number"
                type="phone"
                value={formData.phone_number}
                required
              />
            </div>
            <Button type="submit" className="mt-4 w-full">
              Login
            </Button>
            <Link
              to="/forgot-password"
              className="mt-4 text-center text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>

      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};
