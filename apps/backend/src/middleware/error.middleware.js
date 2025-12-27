const errorHandler = (err, req, res, next) => {
  console.error("UNHANDLED ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};

export default errorHandler;
