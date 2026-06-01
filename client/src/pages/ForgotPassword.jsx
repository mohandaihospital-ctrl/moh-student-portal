import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
  ArrowRight,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { toast } from "sonner";

import api from "@/api/axios";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [
    otpVerified,
    setOtpVerified,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const sendOtp =
    async () => {

      try {

        setLoading(true);

        await api.post(
          "/auth/forgot-password",
          { email }
        );

        setOtpSent(true);

        toast.success(
          "OTP sent successfully"
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to send OTP"
        );

      } finally {

        setLoading(false);
      }
    };

  const verifyOtp =
    async () => {

      try {

        setLoading(true);

        await api.post(
          "/auth/verify-otp",
          {
            email,
            otp,
          }
        );

        setOtpVerified(true);

        toast.success(
          "OTP verified successfully"
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Invalid OTP"
        );

      } finally {

        setLoading(false);
      }
    };

  const resetPassword =
    async (e) => {

      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {

        return toast.error(
          "Passwords do not match"
        );
      }

      try {

        setLoading(true);

        await api.post(
          "/auth/reset-password",
          {
            email,
            password,
          }
        );

        toast.success(
          "Password updated successfully"
        );

        navigate("/login");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to reset password"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">

      <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-sm p-8">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-[var(--heading)]">

            Forgot Password

          </h1>

          <p className="text-[var(--text)] mt-2">

            Reset your account password

          </p>

        </div>

        <form
          onSubmit={resetPassword}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div className="space-y-2">

            <Label>Email Address</Label>

            <div className="flex gap-2">

              <Input
                type="email"
                value={email}
                disabled={
                  otpVerified
                }
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Enter email"
              />

              <Button
                type="button"
                onClick={sendOtp}
                disabled={
                  !email ||
                  loading ||
                  otpVerified
                }
              >

                Send OTP

              </Button>

            </div>

          </div>

          {/* OTP */}

          {otpSent &&
            !otpVerified && (

              <div className="space-y-2">

                <Label>

                  Verification OTP

                </Label>

                <div className="flex gap-2">

                  <Input
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value
                      )
                    }
                    placeholder="Enter OTP"
                  />

                  <Button
                    type="button"
                    onClick={
                      verifyOtp
                    }
                  >

                    Verify

                  </Button>

                </div>

              </div>
            )}

          {/* PASSWORDS */}

          {otpVerified && (

            <>

              <div className="space-y-2">

                <Label>

                  New Password

                </Label>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text)]"
                  />

                  <Input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      password
                    }
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="pl-11 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >

                    {showPassword ? (
                      <EyeOff
                        size={18}
                      />
                    ) : (
                      <Eye
                        size={18}
                      />
                    )}

                  </button>

                </div>

              </div>

              <div className="space-y-2">

                <Label>

                  Confirm Password

                </Label>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text)]"
                  />

                  <Input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      confirmPassword
                    }
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="pl-11 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >

                    {showConfirmPassword ? (
                      <EyeOff
                        size={18}
                      />
                    ) : (
                      <Eye
                        size={18}
                      />
                    )}

                  </button>

                </div>

              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >

                Reset Password

                <ArrowRight className="ml-2 h-4 w-4" />

              </Button>

            </>
          )}

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="text-[var(--primary)] font-medium"
          >

            Back to Login

          </Link>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;