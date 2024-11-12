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
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await login(credentials);
      setSuccess("Login successful!");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Display success or error messages */}
      {success && <div className="text-green-500 text-sm text-center mb-4">{success}</div>}
      {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

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
                value={credentials.username}
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
                value={credentials.password}
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
    </form>
  );
}
