const {sendEmail} = require('../utils/mailer')
const bcrypt = require('bcrypt')
const {User, schema} = require('../model/user')
const jwt = require('jsonwebtoken')
// const {generateOtp}  = require('../utils/generateOtp')

exports.getUser = async(req,res) => {
   try {
    const user = await User.find()
    res.json(user)
   } catch (error) {
    console.log(error.message);
   }
}

//Generating an OTP 
exports.createUser = async (req, res) => {

  const {error} = schema.validate(req.body)
      if (error) return res.status(404).send(error.details[0].message)
  
      let user = await User.findOne({ phone: req.body.phone })
      if (user) return res.status(400).send("User already registered")

  let { name, email, password , phone, role , gender} = req.body;

  const salt = await bcrypt.genSalt(10)
  password = await bcrypt.hash(password,salt)

  try {
    const digits = '0123456789';
    let otpCode = '';
    for (let i = 0; i < 6; i++) {
      otpCode += digits[Math.floor(Math.random() * 10)];
    }

    const subject = 'OTP code for registration';
    const text = `Your OTP code is ${otpCode}`;

    await sendEmail(email, subject, text);

    req.session.otpCode = otpCode;
    req.session.userDetails = {
      name,
      email,
      password,
      phone,
      role,
      gender
    };

    res.send('Email sent for OTP verification');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email');
  }
};

exports.loginUser = async (req,res) => {

    let user = await User.findOne({ name: req.body.name })
    if (!user) { return res.status(400).send("Invalid name") };

    let isPassword = await bcrypt.compare(req.body.password, user.password)
    console.log(req.body.password);
    console.log(user.password);
    if (!isPassword) {
        return res.status(400).send("INVALID PASSWORD")
    }

   const token = jwt.sign({userId : user._id, userRole : user.role}, process.env.PRIVATE_KEY)
    return res.json({ token: token, msg: "Login Successfully" })

};

exports.updateUser = async (req, res) => {
    try {
      const updatedUser = await User.updateMany(
        { phone: req.body.phone },
        { $set: (req.body) }
      );
      if (!updatedUser) {
        return res.status(400).send('User not found');
      }
  
      res.json(updatedUser);

} catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
};

exports.deleteUser = async (req,res) => {
 

    const dltUser = await User.deleteOne(
        { phone: req.body.phone }
      );
      if (!dltUser) {
        return res.status(400).send('User not found');
      }

   res.json({user : dltUser , msg : "Deleted Successfully"})
}

//Verifying Otp and creating User
exports.verifyOtpAndCreateUser = async (req, res) => {
  const userOtp = req.body.otp;

  const storedOtp = req.session.otpCode;
  const userDetails = req.session.userDetails;

  if (userOtp === storedOtp) {
    try {
      const user = await User.create(userDetails);

      // req.session.otpCode = null;
      // req.session.userDetails = null;

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to create user');
    }
  } else {
    res.status(400).send('Invalid OTP');
  }
};

exports.editUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.userId, req.body);
  // console.log(req.user);
  if (!user) return res.status(403).send('User not found')

  let isPassword = await bcrypt.compare(req.body.password, user.password)
  // console.log("REQ =>", req.body.password);
  // console.log("USER =>", user.password);
  if (isPassword) {
    return res.status(400).send("INVALID PASSWORD")
  }

  // check if password is updated
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(req.body.password, salt)
    await user.save()
  }

  res.send(user);
}

