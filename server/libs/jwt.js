import jwt from "jsonwebtoken";

const createSendToken = (res, status, user) => {
    //! Creating JWT token with expiration
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
  
    //! Cookie options with secure and httpOnly settings
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
      ),
      httpOnly: true, // Prevent access to cookie via JavaScript (client-side)
      secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
      sameSite: 'Strict', // Strict mode for same-site requests (mitigates CSRF)
    };
  
    //! Send JWT token in a cookie
    res.cookie("jwtToken", jwtToken, cookieOptions);
  
    //! Remove password field from user object
    user.password = undefined;
  
    res.status(status).json({ success: true, status, user });
  };

  export default createSendToken;