const { NotFoundError } = require("../utils/request");

// This function is to handle error when API hit
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const errors = err.errors || [];
  let message = err.message;
  if (status == 500) {
      message = "Internal Server Error";
  }

  res.status(status).json({
      success: false,
      data: null,
      message,
      errors,
  });
};

const notFoundURLHandler = (req, res, next) => {
  throw new NotFoundError("URL Not Found!");
};

module.exports = {
  errorHandler,
  notFoundURLHandler
};