import JWT from 'jsonwebtoken';  
import userModel from '../models/userModel.js';

//Protected token based access
export const requireSignIn = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Token is missing or invalid' });
    }
  
    try {
      console.log("Verifying token:", token); // Debug log
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
  

//Admin access
export const isAdmin = async(req, res, next)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized access"
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error in admin middleware"
        })
    }
}