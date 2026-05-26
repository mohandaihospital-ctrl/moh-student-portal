import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { z } from "zod";

import logo from "@/assets/logo.png";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import api from "@/api/axios";

import { AuthContext } from "@/context/AuthContext";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z
    .string()
    .email("Enter valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {

  const navigate = useNavigate();

  const { setUser } =
    useContext(AuthContext);

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:
      zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit =
    async (formData) => {

      try {

        setLoading(true);

        const { data } =
          await api.post(
            "/auth/login",
            formData
          );

        localStorage.setItem(
          "token",
          data.token
        );

        setUser(data.user);

        if (
          data.user.role ===
          "admin"
        ) {

          navigate(
            "/admin/dashboard"
          );

        } else {

          navigate("/dashboard");
        }

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Login failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--surface)]">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex relative overflow-hidden bg-[var(--soft-blue)] border-r border-[var(--border)]">

        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--soft-blue-2)] rounded-full blur-3xl opacity-70" />

        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--soft-blue-2)] rounded-full blur-3xl opacity-70" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">

          <div>

            <div className="flex items-center gap-3">
<img
  src={logo}
  alt="MOH Logo"
  className="w-20 h-20 object-contain"
/>

              <div>

                <h2 className="text-2xl font-bold text-[var(--heading)]">
                  Student Portal
                </h2>

                <p className="text-[var(--text)] text-sm mt-1">
                  Admission Management System
                </p>

              </div>

            </div>

            <div className="mt-16 max-w-lg">

              <h1 className="text-5xl font-bold leading-tight text-[var(--heading)]">

                Welcome
                <span className="text-[var(--primary)] block">
                  Back Again
                </span>

              </h1>

              <p className="text-[var(--text)] text-lg mt-6 leading-relaxed">

                Access your student dashboard,
                manage applications, and continue
                your admission journey securely.

              </p>

            </div>

          </div>

          {/* FEATURES */}

          <div className="space-y-5 max-w-lg">

            <div className="flex items-start gap-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">

              <div className="mt-0.5">
                <CheckCircle2 className="text-[var(--primary)]" />
              </div>

              <div>

                <h4 className="font-semibold text-[var(--heading)]">
                  Secure Login System
                </h4>

                <p className="text-sm text-[var(--text)] mt-1">
                  Secure authentication and protected
                  student access system.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">

              <div className="mt-0.5">
                <CheckCircle2 className="text-[var(--primary)]" />
              </div>

              <div>

                <h4 className="font-semibold text-[var(--heading)]">
                  Manage Applications
                </h4>

                <p className="text-sm text-[var(--text)] mt-1">
                  Track applications, upload documents,
                  and manage your profile easily.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center justify-center px-5 py-10 bg-[var(--surface)]">

        <div className="w-full max-w-lg">

          {/* MOBILE LOGO */}

          <div className="flex items-center gap-3 mb-10 lg:hidden">

            <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center">

              <GraduationCap className="text-white" />

            </div>

            <div>

              <h2 className="font-bold text-[var(--heading)]">
                Student Portal
              </h2>

              <p className="text-sm text-[var(--text)]">
                Admission Management System
              </p>

            </div>

          </div>

          {/* FORM CARD */}

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-sm p-8 sm:p-10">

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-[var(--heading)]">
                Student Login
              </h2>

              <p className="text-[var(--text)] mt-2">
                Login to access your student portal and brochure downloads
              </p>

            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* EMAIL */}

              <div className="space-y-2">

                <Label className="text-[var(--heading)]">
                  Email Address
                </Label>

                <Input
                  type="email"
                  placeholder="Enter email address"
                  {...register("email")}
                  className="h-12 border-[var(--border)] focus-visible:ring-[var(--primary)]"
                />

                {errors.email && (
                  <p className="text-sm text-[var(--danger)]">
                    {errors.email.message}
                  </p>
                )}

              </div>

              {/* PASSWORD */}

              <div className="space-y-2">

                <Label className="text-[var(--heading)]">
                  Password
                </Label>

                <Input
                  type="password"
                  placeholder="Enter password"
                  {...register("password")}
                  className="h-12 border-[var(--border)] focus-visible:ring-[var(--primary)]"
                />

                {errors.password && (
                  <p className="text-sm text-[var(--danger)]">
                    {errors.password.message}
                  </p>
                )}

              </div>

              {/* BUTTON */}

              <Button
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium"
              >

                {loading
                  ? "Logging In..."
                  : "Login"}

                {!loading && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}

              </Button>

            </form>

            <p className="text-center text-[var(--text)] mt-8">

              Don’t have an account?{" "}

              <Link
                to="/register"
                className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;