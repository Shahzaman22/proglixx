const generateOtp = () => {
    const digits = '0123456789';
    let otpCode = '';
    for (let i = 0; i < 6; i++) {
      otpCode += digits[Math.floor(Math.random() * 10)];
    }

    const subject = 'OTP code for registration';
    const text = `Your OTP code is ${otpCode}`;
}

exports.generateOtp = generateOtp