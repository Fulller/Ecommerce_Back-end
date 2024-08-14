import otpGenerator from "otp-generator";

function generateDegitOTP(length = 6) {
  return otpGenerator.generate(length, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
}

export default generateDegitOTP;
