const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
// export {asyncHandler}

// method of intialization of function into function
// 1. const asyncHandler = () => {};
// 2. const asyncHandler = (func) => {() => {}};
// 3. const asyncHandler = (func) => async () => {};

// const asyncHandler = (func) => async (req, res, next) => {
//     try {
//       await func(req,res,next)
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       messgae: err.message,
//     });
//   }
// };
