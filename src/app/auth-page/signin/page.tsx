"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LoaderCircle, LockIcon, MailIcon } from "lucide-react";
import ComponentHeader from "@/components/ComponentHeader/ComponentHeader";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import DefaultLayout from "@/components/Layout/DefaultLayout";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <ComponentHeader pageName="Sign In" />

      <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="mx-auto w-full max-w-md px-4 py-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
              Sign In to Your Account
            </h2>

            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-10 pr-4 text-gray-800 dark:text-gray-200 outline-none focus:border-primary dark:focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                    required
                    disabled={isLoading}
                  />
                  <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">
                    <MailIcon />
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-10 pr-4 text-gray-800 dark:text-gray-200 outline-none focus:border-primary dark:focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                    required
                    disabled={isLoading}
                  />
                  <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">
                    <LockIcon />
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full rounded-lg border border-primary bg-primary p-4 text-white text-lg font-medium transition-all duration-300 hover:bg-primary-dark disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <LoaderCircle className="mr-2 animate-spin" /> Signing In...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-700 dark:text-gray-300">
                  Don’t have an account?{" "}
                  <Link href="/auth-page/signup" className="text-primary hover:underline">
                    Sign Up
                  </Link>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Forgot Password?{" "}
                  <Link href="/forget-password" className="text-primary hover:underline">
                    Reset
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignIn;
