import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  /* steps for registering a user - 
    1. get user details from frontend
    2. validation - not empty
    3. check if user already exist: check from username or email
    4. check for images, check for avatar
    5. upload them to cloudinary, avatar
    6. create user object- create entry in DB
    7. remove password and refresh token field from response
    8. check for user creation
    9. return res
  */
  const { fullName, email, username, password } = req.body;
  // Basic Check Method-
  //   if (fullName === "") {
  //     throw new ApiError(400, "fullName is required");
  //   }

  // Advance Check Method-
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  const existedUser = User.findOne({ $or: [{ username }, { email }] }); // check if user is exist using either from username or email
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) throw new ApiError(400, "Avatar file is required");

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
  res.status(200).json({
    message: "ok",
  });
});
export { registerUser };
