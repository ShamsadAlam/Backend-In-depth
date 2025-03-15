// file selected using multer and will be uploaded on cloudinary
// Process->    1. select file using multer
//              2. upload on our local server (used for resend facility)
//              3. then will be uploaded on cloudinary

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const uploadResult = await cloudinary.uploader
      .upload(
        "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
        {
          public_id: "shoes",
          resource_type: "auto",
        }
      )
      .catch((error) => {
        console.log("Error uploading on cloudinary.", error);
      });
    console.log("file is uploaded on cloudinary.", uploadResult);
    return uploadResult;

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url("shoes", {
      fetch_format: "auto",
      quality: "auto",
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url("shoes", {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    console.log(autoCropUrl);
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed.
    return null;
  }
};

export { uploadOnCloudinary };
