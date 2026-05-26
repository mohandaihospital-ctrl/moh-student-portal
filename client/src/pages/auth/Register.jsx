import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/assets/logo.png";

import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import { toast } from "sonner";

import api from "@/api/axios";

import { AuthContext } from "@/context/AuthContext";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(
        3,
        "Full name is required"
      ),

    email: z
      .string()
      .email(
        "Enter valid email"
      ),

    mobile: z
      .string()
      .min(
        10,
        "Enter valid mobile number"
      ),

    password: z
      .string()
      .min(
        6,
        "Password must be at least 6 characters"
      ),

    confirmPassword: z
      .string()
      .min(
        6,
        "Confirm your password"
      ),

    selectedCourse: z
      .string()
      .min(
        1,
        "Please select course"
      ),
  })

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      path: [
        "confirmPassword",
      ],

      message:
        "Passwords do not match",
    }
  );

const Register = () => {

  const navigate =
    useNavigate();

  const { setUser } =
    useContext(AuthContext);

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:
      zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      selectedCourse: "",
    },
  });

  const onSubmit =
    async (formData) => {

      try {

        setLoading(true);

        const payload = {
          name:
            formData.name,

          email:
            formData.email,

          mobile:
            formData.mobile,

          password:
            formData.password,

          selectedCourse:
            formData.selectedCourse,
        };

        const { data } =
          await api.post(
            "/auth/register",
            payload
          );

        localStorage.setItem(
          "token",
          data.token
        );

        setUser(data.user);

        toast.success(
          "Account created successfully"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Registration failed"
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

               Access Nursing 
                <span className="text-[var(--primary)] block">

Program Brochures

                </span>

              </h1>

              <p className="text-[var(--text)] text-lg mt-6 leading-relaxed">

               Create your student account to access official nursing course brochures and program information.

              </p>

            </div>

          </div>

          {/* FEATURES */}

          <div className="space-y-2 mt-0 max-w-lg">

            <div className="flex items-start gap-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">

              <div className="mt-0.5">

                <CheckCircle2 className="text-[var(--primary)]" />

              </div>

              <div>

                <h4 className="font-semibold text-[var(--heading)]">

                  Easy Application Process

                </h4>

                <p className="text-sm text-[var(--text)] mt-1">

                  Submit documents and complete
                  admission applications
                  seamlessly.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">

              <div className="mt-0.5">

                <CheckCircle2 className="text-[var(--primary)]" />

              </div>

              <div>

                <h4 className="font-semibold text-[var(--heading)]">

                  Secure Student Access

                </h4>

                <p className="text-sm text-[var(--text)] mt-1">

                  Protected student dashboard
                  with secure authentication and
                  document handling.

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

                Create Account

              </h2>

              <p className="text-[var(--text)] mt-2">

                Register your student account
                to continue

              </p>

            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* NAME */}

              <div className="space-y-2">

                <Label className="text-[var(--heading)]">

                  Full Name

                </Label>

                <Input
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="h-12 border-[var(--border)] focus-visible:ring-[var(--primary)]"
                />

                {errors.name && (

                  <p className="text-sm text-[var(--danger)]">

                    {errors.name.message}

                  </p>

                )}

              </div>

              {/* EMAIL */}

              <div className="space-y-2">

                <Label className="text-[var(--heading)]">

                  Email Address

                </Label>

                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 border-[var(--border)] focus-visible:ring-[var(--primary)]"
                />

                {errors.email && (

                  <p className="text-sm text-[var(--danger)]">

                    {errors.email.message}

                  </p>

                )}

              </div>

              {/* MOBILE */}

              <div className="space-y-2">

                <Label className="text-[var(--heading)]">

                  Mobile Number

                </Label>

                <Input
                  {...register("mobile")}
                  placeholder="Enter mobile number"
                  className="h-12 border-[var(--border)] focus-visible:ring-[var(--primary)]"
                />

                {errors.mobile && (

                  <p className="text-sm text-[var(--danger)]">

                    {errors.mobile.message}

                  </p>

                )}

              </div>

              {/* PASSWORD */}

              <div className="space-y-2">

                <Label className="text-[var(--heading)]">

                  Password

                </Label>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text)]"
                  />

                  <Input
                    {...register("password")}
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create password"
                    className="h-12 pl-11 pr-12 border-[var(--border)] focus-visible:ring-[var(--primary)]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text)]"
                  >

                    {showPassword ? (

                      <EyeOff size={18} />

                    ) : (

                      <Eye size={18} />

                    )}

                  </button>

                </div>

                {errors.password && (

                  <p className="text-sm text-[var(--danger)]">

                    {errors.password.message}

                  </p>

                )}

              </div>

              {/* CONFIRM PASSWORD */}

              <div className="space-y-2">

                <Label className="text-[var(--heading)]">

                  Confirm Password

                </Label>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text)]"
                  />

                  <Input
                    {...register(
                      "confirmPassword"
                    )}
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm password"
                    className="h-12 pl-11 pr-12 border-[var(--border)] focus-visible:ring-[var(--primary)]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text)]"
                  >

                    {showConfirmPassword ? (

                      <EyeOff size={18} />

                    ) : (

                      <Eye size={18} />

                    )}

                  </button>

                </div>

                {errors.confirmPassword && (

                  <p className="text-sm text-[var(--danger)]">

                    {
                      errors
                        .confirmPassword
                        .message
                    }

                  </p>

                )}

              </div>

              {/* COURSE */}

              <div className="space-y-2">

                <Label className="text-[var(--heading)]">

                  Select Course

                </Label>

                <select
                  {...register("selectedCourse")}
                  className="w-full h-12 px-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--heading)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                >

                  <option value="">

                    Choose course

                  </option>

                  <option value="bsc_nursing">

                    B.Sc Nursing

                  </option>

                  <option value="gnm">

                    GNM

                  </option>

                  <option value="post_bsc">

                    Post B.Sc Nursing

                  </option>

                </select>

                {errors.selectedCourse && (

                  <p className="text-sm text-[var(--danger)]">

                    {
                      errors
                        .selectedCourse
                        .message
                    }

                  </p>

                )}

              </div>

              {/* BUTTON */}

              <Button
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium"
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

                {!loading && (

                  <ArrowRight className="ml-2 h-4 w-4" />

                )}

              </Button>

            </form>

            <p className="text-center text-[var(--text)] mt-8">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
              >

                Login

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;