const sendToken = (user, statusCode, res) => {
  const token = user.getJWT();
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};
export default sendToken;
