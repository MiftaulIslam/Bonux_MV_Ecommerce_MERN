// error.js
const ErrorHandler = require('../utiles/ErrorHandler');

module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific errors
  if (err.name === 'CastError') {
    message = 'Resource not found with this id';
    statusCode = 400;
    err = new ErrorHandler(message, statusCode); // Corrected
  } else if (err.code === 11000) {
    message = 'Duplicate key entered';
    statusCode = 400;
    err = new ErrorHandler(message, statusCode); // Corrected
  } else if (err.name === 'JsonWebTokenError') {
    message = 'Invalid URL, try again later';
    statusCode = 400;
    err = new ErrorHandler(message, statusCode); // Corrected
  } else if (err.name === 'TokenExpiredError') {
    message = 'Token expired, try again later';
    statusCode = 400;
    err = new ErrorHandler(message, statusCode); // Corrected
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message: message,
    stack:err.stack,
    error: err.message,
    err:err // Send only the error message
  });
};
