import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Check,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegister } from "../hooks/useAuth";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  email: z.string().email("Enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const password = watch("password") || "";

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const strength = Object.values(checks).filter(Boolean).length * 25;

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur-xl lg:grid lg:grid-cols-2">
        {/* Left */}
        <div className="hidden lg:flex flex-col justify-center border-r border-slate-800 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-600/10 p-12">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Join Assist AI</span>
          </div>

          <h1 className="mt-8 text-5xl font-bold text-white leading-tight">
            Create your
            <br />
            account
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-slate-400">
            Build, collaborate, and manage AI-powered workflows in one secure
            platform.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <Check className="h-5 w-5 text-green-400" />
              Secure authentication
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Check className="h-5 w-5 text-green-400" />
              Fast onboarding
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Check className="h-5 w-5 text-green-400" />
              Modern AI workspace
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>

            <p className="mt-2 text-slate-400">
              Start your journey with Assist AI.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  {...register("name")}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                />
              </div>

              {errors.name && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Create a secure password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3 pl-11 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}

              {password && (
                <div className="mt-4 space-y-3">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all duration-300"
                      style={{ width: `${strength}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span
                      className={
                        checks.length ? "text-green-400" : "text-slate-500"
                      }
                    >
                      ✓ 8+ characters
                    </span>

                    <span
                      className={
                        checks.upper ? "text-green-400" : "text-slate-500"
                      }
                    >
                      ✓ Uppercase
                    </span>

                    <span
                      className={
                        checks.lower ? "text-green-400" : "text-slate-500"
                      }
                    >
                      ✓ Lowercase
                    </span>

                    <span
                      className={
                        checks.number ? "text-green-400" : "text-slate-500"
                      }
                    >
                      ✓ Number
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition-all hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {registerMutation.isPending && (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}

              {registerMutation.isPending
                ? "Creating account..."
                : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
