require("dotenv").config();
const Jwt = require("jsonwebtoken");

const genJwtToken = (user,EXTime) => {
 // console.log('EXTime',EXTime)
  let token = Jwt.sign({user},process.env.JWT_KEY, {
    expiresIn: EXTime});
    
  return token;
};

const varifyToken = (token) => {
  let check = Jwt.verify(token, process.env.JWT_KEY, (err, valid) => {
    if (err) {
      console.log("Jwt~~~~~~>err", err);
    } else {
      return valid;
    }
  });
  return check;
};

module.exports = {
  genJwtToken,
  varifyToken,
};
