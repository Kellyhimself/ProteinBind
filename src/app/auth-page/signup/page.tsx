"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import ComponentHeader from "@/components/ComponentHeader/ComponentHeader";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import { createUser } from "@/lib/actions/user.actions";
import {
  LoaderCircle,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

const SignUp: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    photo: "",
    userBio: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formVisible, setFormVisible] = useState<boolean>(true); // New state to control form visibility

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageFile(file);
  };

  const convertImageToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const validateForm = useCallback(() => {
    if (
      !user.email ||
      !user.firstName ||
      !user.lastName ||
      !user.password ||
      !user.confirmPassword
    ) {
      return "Please fill in all the fields.";
    }
    if (user.password !== user.confirmPassword) {
      return "Passwords do not match.";
    }
    if (!imageFile) {
      return "Please upload a profile picture.";
    }
    return null;
  }, [user, imageFile]);

  let isSubmitting = false;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    setIsLoading(true);

    const formError = validateForm();
    if (formError) {
      setErrors(formError);
      setIsLoading(false);
      isSubmitting = false;
      return;
    }

    setErrors(null);
    setSuccessMessage(null); // Reset success message on new submission

    try {
      let base64Image = "";
      if (imageFile) {
        base64Image = await convertImageToBase64(imageFile);
      }

      const newUser = {
        ...user,
        photo: base64Image,
      };

      await createUser(newUser);

      setFormVisible(false); // Hide the signup form
      setSuccessMessage("Registration successful! A verification email has been sent to your email address.");
    } catch (error) {
      console.error("Error registering user:", error);
      setErrors("Registration failed.");
    } finally {
      isSubmitting = false;
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <ComponentHeader pageName="Sign Up" />

      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        {formVisible ? (
          <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark w-full max-w-md p-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
              Create Your Account
            </h2>

            {errors && <div className="text-red-500 mb-4 text-center">{errors}</div>}
            {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
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

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-gray-800 dark:text-gray-200 outline-none focus:border-primary dark:focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-gray-800 dark:text-gray-200 outline-none focus:border-primary dark:focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
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

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-10 pr-4 text-gray-800 dark:text-gray-200 outline-none focus:border-primary dark:focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                    required
                    disabled={isLoading}
                  />
                  <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">
                    <LockIcon />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-stroke py-2 px-4 rounded-lg bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full rounded-lg border border-primary bg-primary p-4 text-white text-lg font-medium transition-all duration-300 hover:bg-primary-dark disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <LoaderCircle className="mr-2 animate-spin" /> Registering...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-700 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link href="/auth-page/signin" className="text-primary hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="rounded-lg border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark w-full max-w-md text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Success!
              </h2>
              <p className="text-lg text-green-600 dark:text-green-400 mb-6">
                {successMessage}
              </p>
              <Link
                href="/auth-page/signin"
                className="inline-block rounded-lg border border-primary bg-primary p-4 text-white text-lg font-medium transition-all duration-300 hover:bg-primary-dark"
              >
                Go to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default SignUp;
