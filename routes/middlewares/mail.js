require("dotenv").config();
const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
const nodemailer = require("nodemailer");

const emailAuth = (email, token, hexNum) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: "465",
        secure: true, // true for 465, flase for other port
        auth: { // 이메일을 보낼 계정 데이터
            user: ADMIN_EMAIL,
            pass: ADMIN_PASSWORD
        }
    });
    
    const options = {
        from: ADMIN_EMAIL,
        to: email,
        subject: "[ PoDo 인증번호 ]",
        html: `아래의 URL을 클릭하여 인증번호를 입력해주세요. (유효시간 5분)\n
            http://localhost/${email}/${token} \n
            [  ${hexNum}  ]`
    }

    transporter.sendMail(options, (error, info) => {
        if (error) console.log(error);
        else {
            transporter.close();
        }
    });
}

module.exports = { emailAuth };
