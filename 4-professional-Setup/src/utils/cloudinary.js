// file selected using multer and will be uploaded on cloudinary
// Process->    1. select file using multer
//              2. upload on our local server (used for resend facility)
//              3. then will be uploaded on cloudinary

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "process";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary configuration
const configData = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  console.log("local File Path:", localFilePath);

  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const uploadResult = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.log("Error uploading on cloudinary.", error);
      });
    // console.log("file is uploaded on cloudinary.", uploadResult);
    fs.unlinkSync(localFilePath);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed.
    return null;
  }
};

export { uploadOnCloudinary };
