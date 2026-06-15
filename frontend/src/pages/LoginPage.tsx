
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600/10 via-slate-900 to-cyan-500/10 border-r border-slate-800">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 w-fit">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300">
              AI Powered Workspace
            </span>
          </div>

          <h1 className="mt-8 text-5xl font-bold text-white leading-tight">
            Welcome to
            <br />
            Assist AI
          </h1>

          <p className="mt-6 text-slate-400 text-lg leading-8 max-w-md">
            Sign in to securely access your AI dashboard, manage projects,
            and collaborate with confidence.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-5">
              <h3 className="font-semibold text-white">Fast Access</h3>
              <p className="mt-2 text-sm text-slate-400">
                Lightning-fast authentication experience.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-5">
              <h3 className="font-semibold text-white">Secure</h3>
              <p className="mt-2 text-sm text-slate-400">
                Built with modern security best practices.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white">
              Sign in
            </h2>

            <p className="mt-2 text-slate-400">
              Welcome back! Enter your credentials below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
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
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3 pl-11 pr-12 text-white placeholder:text-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
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
            </div>

            <button
              type="submit"
              disabled={login.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition-all hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {login.isPending && (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}

              {login.isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
;
