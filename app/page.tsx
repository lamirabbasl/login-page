"use client";

import { useState } from "react";
import Image from "next/image";

// Define the structure of form data
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: string;
  gender: "male" | "female";
  acceptPromotions: boolean;
};

export default function Dashboard() {
  // Initialize state for form data, saved data, profile image, and various UI states
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    gender: "male",
    acceptPromotions: false,
  });

  const [savedData, setSavedData] = useState<FormData | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [requireMessage, setRequireMessage] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);

  // Handle changes in input fields and update the state accordingly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));

    // Show a required field message if the name field is empty
    if (id === "name") {
      setRequireMessage(value === "");
    }
  };

  // Handle gender selection and update the gender in form data
  const handleGenderChange = (gender: "male" | "female") => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  // Handle form submission and save the current form data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedData(formData);
  };

  // Handle image upload and convert the uploaded image to a base64 string
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploaded(true);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center font-vazir h-screen w-screen bg-white">
      {/* Profile Image Upload Section */}
      <div
        className="flex justify-center mb-6 cursor-pointer relative"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {!imageUploaded && (
          <>
            <div className="absolute w-[60px] rounded-full mt-[20px] h-[60px] bg-white"></div>
            <div className="absolute w-[120px] rounded-full mt-[90px] h-[160px] bg-white"></div>
          </>
        )}

        <Image
          src={profileImage || "/Rectangle 1.svg"}
          alt="Profile Placeholder"
          width={140}
          height={140}
        />

        <Image
          src="/plus-circle.svg"
          alt="Upload Icon"
          width={30}
          height={30}
          className={`absolute ${
            imageUploaded ? "top-[60px] ml-[160px]" : "top-[115px] ml-[120px]"
          }`}
        />
      </div>

      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="z-50 flex flex-row-reverse w-full h-3/5 text-right items-center justify-center gap-[180px]"
      >
        <div className="flex flex-col gap-7">
          {/* Name Input */}
          <div className="flex flex-col gap-2 w-[350px]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              نام و نام خانوادگی (نام مستعار)
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              required
              className={`mt-1 block w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none sm:text-sm text-right ${
                requireMessage ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              onFocus={() => setRequireMessage(formData.name === "")}
            />
            {requireMessage && (
              <p className="absolute mt-[90px] text-left text-[11px] text-red-500">
                وارد کردن این فیلد اجباری است
              </p>
            )}
          </div>

          {/* Birthdate Input */}
          <div className="flex flex-col gap-2 w-[350px]">
            <label
              htmlFor="birthdate"
              className="block text-sm font-medium text-gray-700"
            >
              تاریخ تولد
            </label>
            <div className="relative">
              <input
                type="text"
                id="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                placeholder="تاریخ تولد را وارد کنید"
                required
                className="mt-1 block w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
              />
              <Image
                src="/Vector.svg"
                alt="View calendar"
                width={22}
                height={22}
                className="absolute bottom-3 left-4 cursor-pointer"
              />
            </div>
          </div>

          {/* Gender Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              جنسیت
            </label>
            <div className="flex justify-center gap-10 mt-2">
              <div
                className={`flex flex-col justify-center items-center bg-gray-200 cursor-pointer w-[90px] h-[90px] rounded-[15px] ${
                  formData.gender === "female" ? "ring-2 ring-orange-300" : ""
                }`}
                onClick={() => handleGenderChange("female")}
              >
                <Image src="/👩.png" alt="Female" width={50} height={50} />
                <p>زن</p>
              </div>
              <div
                className={`flex flex-col justify-center items-center bg-gray-200 cursor-pointer w-[90px] h-[90px] rounded-[15px] ${
                  formData.gender === "male" ? "ring-2 ring-orange-300" : ""
                }`}
                onClick={() => handleGenderChange("male")}
              >
                <Image src="/👨.png" alt="Male" width={50} height={50} />
                <p> مرد</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-7">
          {/* Email Input */}
          <div className="flex flex-col gap-2 w-[350px]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              آدرس ایمیل
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="آدرس ایمیل خود را وارد کنید"
              required
              className="mt-1 block w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2 w-[350px]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              رمز عبور
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="رمز عبور خود را وارد کنید"
                required
                className="block w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
              />
              <Image
                src="/View_hide.svg"
                alt="Toggle password visibility"
                width={33}
                height={33}
                className="absolute bottom-2 left-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-2 w-[350px]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              تایید رمز عبور
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="رمز عبور را تایید کنید"
                required
                className="block w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
              />
              <Image
                src="/View_hide.svg"
                alt="Toggle password visibility"
                width={33}
                height={33}
                className="absolute bottom-2 left-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>

          {/* Accept Promotions Checkbox */}
          <div className="flex flex-row-reverse gap-2 items-center justify-start">
            <input
              type="checkbox"
              id="acceptPromotions"
              checked={formData.acceptPromotions}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300 rounded cursor-pointer"
            />
            <label
              className="flex flex-row-reverse items-center gap-3"
              htmlFor="acceptPromotions"
            >
              <span className="ml-2 text-sm text-right text-gray-600">
                مایل به دریافت پیام های تبلیغاتی هستم
              </span>
            </label>
          </div>
        </div>
      </form>

      {/* Save Button */}
      <button
        type="submit"
        className="w-[320px] h-[50px] py-2 px-4 bg-cyan-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={handleSubmit}
      >
        ذخیره
      </button>

      {/* Display Saved Data */}
      {savedData && (
        <div className=" absolute  top-0 left-0  p-4 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-2">Saved Data:</h2>
          <pre className="text-sm">{JSON.stringify(savedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
