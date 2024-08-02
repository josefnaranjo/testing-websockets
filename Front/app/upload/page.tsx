"use client";

import React from "react";
import ImageUpload from "../components/upload/page";

const UploadPage: React.FC = () => {
  const userId = "your-user-id"; // Replace with actual user ID logic

  const handleUpload = (imageUrl: string) => {
    console.log("Uploaded image URL:", imageUrl);
  };

  const handleClose = () => {
    console.log("Upload modal closed");
  };

  return (
    <div>
      <h1>Upload Your Image</h1>
      <ImageUpload
        userId={userId}
        onClose={handleClose}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default UploadPage;
