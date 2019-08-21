const jwt   = require('jsonwebtoken');
import JWT_TOKEN from '../config/jwt';

const options = JWT_TOKEN;

const verifyRequestAuth = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; 
  if ( token ) {
    try {
      jwt.verify(token, JWT_TOKEN.secret.secretKey, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          next();
        }
      });
    }
    catch(err) {
    }
  } else {
    return res.json({
      success: false,
      message: 'Token not found'
    });
  }
}

const Auth = { verifyRequestAuth }
export default Auth;
