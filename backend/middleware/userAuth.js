import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {

   console.log('Received cookies:', req.cookies); //1

     const {token} = req.cookies;

     if (!token) {
      console.log('Received cookies:', req.cookies); //2
        return res.json({success: false, message: 'Not Authorized. Login Again!'})
     }

     try {
        
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body = req.body || {};
            req.body.userId = tokenDecode.id;
        }else {
            return res.json({success: false, message: 'Not Authorized. Login Again!'})
        }

        next();

     } catch (error) {
        return res.json({success: false, message: error.message})
     }
}

export default userAuth;