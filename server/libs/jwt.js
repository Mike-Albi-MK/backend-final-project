import jwt from "jsonwebtoken";

const createSendToken = (res, status, user) => {
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
  
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
      ),
    };
  
    res.cookie("jwtToken", jwtToken, cookieOptions);
  
    user.password = undefined;
  
    res.status(status).json({ success: true, status, user });
  };

  export default createSendToken;