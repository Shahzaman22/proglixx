const {sendEmail} = require('../utils/mailer')
const bcrypt = require('bcrypt')
const {User, schema} = require('../modal/user')
const jwt = require('jsonwebtoken')
// const {generateOtpCode} = require('../utils/otpCode')

exports.getUser = async(req,res) => {
   try {
    const user = await User.find()
    res.json(user)
   } catch (error) {
    console.log(error.message);
   }
}

exports.createUser = async (req,res) => {

    const {error} = schema.validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send("User already registered")

    user = await new User(req.body) 
    
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
    await user.save()

    res.json(user)
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

exports.editUser = async (req, res) => {
    try {
      const updatedUser = await User.updateMany(
        { email: req.body.email },
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
 

    const updatedUser = await User.deleteOne(
        { email: req.body.email }
      );
      if (!updatedUser) {
        return res.status(400).send('User not found');
      }

   res.json({user : updatedUser , msg : "Deleted Successfully"})
}

exports.sendOtpVerificationEmail = async (req, res) => {
    const { email} = req.body; 
    try {
    //   const otpCode = generateOtpCode();
    const digits = '0123456789';
    let otpCode = '';
    for (let i = 0; i < 6; i++) {
      otpCode += digits[Math.floor(Math.random() * 10)];
    }
      const subject = 'OTP code for login';
      const text = `Your OTP code is ${otpCode}`;
      await sendEmail(email, subject, text);
      res.send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to send email');
    }
  };   
