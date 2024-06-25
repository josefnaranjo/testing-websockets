"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AccountSettings.module.css";
import ImageUpload from "../upload/page";
import { IoPersonCircleOutline } from "react-icons/io5";
import SectionHeading from "./_components/SectionHeading";
import SettingInputField from "./_components/SettingInputField";
import Image from "next/image";

const AccountSettings: React.FC = () => {
  const [userData, setUserData] = useState<any>(null); // State variable to store user data
  const [originalData, setOriginalData] = useState<any>(null); // To store original data
  const [isLoading, setIsLoading] = useState(true);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/settings");
      console.log("Fetched user data:", response.data);
      setUserData(response.data);
      setOriginalData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSaveClick = async () => {
    try {
      await axios.put("/api/settings", userData);
      console.log("User data updated successfully");
      setOriginalData(userData);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleCancelClick = () => {
    setUserData(originalData);
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setShowImageUpload(false);
    }
  };

  const hasChanges = JSON.stringify(userData) !== JSON.stringify(originalData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No data available. Please complete your profile.</div>;
  }

  return (
    <div className="flex min-h-screen justify-center items-center bg-green-100">
      <div className="flex flex-col justify-center items-center border-4 px-7 py-6 rounded-lg border-green-700 bg-gradient-to-tl from-green-200 to-green-300 h-full  shadow-xl">
        <div className="flex flex-col sm:flex-row space-x-2">
          <div className="flex flex-col w-[19rem]">
            <div className="flex flex-col justify-center items-center ">
              <div
                className="h-32 w-32 rounded-full hover:cursor-pointer"
                onClick={() => setShowImageUpload(true)}
              >
                {userData.settings && userData.settings.user.image ? (
                  <Image
                    src={userData.settings.user.image}
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <IoPersonCircleOutline className="text-9xl text-gray-700" />
                )}
              </div>

              <textarea
                value={userData.about || ""}
                onChange={(e) => handleInputChange("about", e.target.value)}
                className="flex text-center bg-transparent text-xl font-medium outline-none resize-none overflow-hidden"
                placeholder="Tell us about yourself"
              />

              <button
                className="flex items-center justify-center font-medium text-gray-800 whitespace-nowrap rounded-xl bg-emerald-400 hover:bg-emerald-500 px-3 py-2 mt-3"
                onClick={() => setShowImageUpload(true)}
              >
                Change Profile Picture
              </button>

              {showImageUpload && (
                <div
                  className={styles.modalOverlay}
                  onClick={handleOverlayClick}
                >
                  <div className={styles.modalContent}>
                    <ImageUpload
                      userId={userData?.userId}
                      onClose={() => setShowImageUpload(false)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col w-[19rem] m-auto ">
              <SectionHeading>Region</SectionHeading>

              <SettingInputField
                label="Country"
                type="text"
                value={userData.country || ""}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />

              <SettingInputField
                label="Language"
                type="text"
                value={userData.language || ""}
                onChange={(e) => handleInputChange("language", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col w-[19rem] ">
            <SectionHeading>Basic Information</SectionHeading>

            <SettingInputField
              label="Username"
              type="text"
              name="username"
              value={userData.username || ""}
              onChange={(e) => handleInputChange("username", e.target.value)}
            />

            <SettingInputField
              label="Name"
              type="text"
              name="name"
              value={userData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            <SettingInputField
              label="Date of birth"
              type="text"
              name="dob"
              value={userData.dob || ""}
              onChange={(e) => handleInputChange("dob", e.target.value)}
            />

            <SettingInputField
              label="Business"
              type="text"
              value={userData.business || ""}
              onChange={(e) => handleInputChange("business", e.target.value)}
            />

            <SettingInputField
              label="Member Since"
              type="text"
              value={userData.memberSince || ""}
              onChange={(e) => handleInputChange("memberSince", e.target.value)}
            />

            <SettingInputField
              label="Email"
              type="password"
              value={userData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />

            <SettingInputField
              label="Phone Number"
              type="password"
              value={userData.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
        </div>

        {hasChanges && (
          <div className="flex justify-center mt-3 space-x-4">
            <button
              className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={handleSaveClick}
            >
              Save Changes
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
