"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { registerSchema } from "../lib/validation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const parse = registerSchema.safeParse(formData);
    if (!parse.success) {
      const fieldErrors = parse.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted errors.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          toast.error("Email is already registered.");
        } else if (res.status === 429) {
          toast.error("Too many requests. Slow down and try again.");
        } else if (res.status === 400 && data.errors) {
          setErrors(data.errors);
          toast.error("Validation errors occurred.");
        } else {
          toast.error("Something went wrong. Try again later.");
        }
        setLoading(false);
        return;
      }

      toast.success("Account created!");
      router.push("/dashboard"); // ✅ or your post-signup route
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Network error.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="showPassword"
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
        />
        <label htmlFor="showPassword" className="text-sm text-gray-600">
          Show password
        </label>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
