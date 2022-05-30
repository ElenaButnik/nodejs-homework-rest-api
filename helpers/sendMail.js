const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async(data)=> {
    try {
        const mail = {...data, from: 'butnik.elena@gmail.com'}
        await sgMail.send(mail);
        return true;
    } catch (error) {
        // throw error;
        console.log(error.message)
    }
};

module.exports = sendMail;

// const mail = {
//   to: "homir30401@runchet.com",
//   from: "butnik.elena@gmail.com",
//   subject: "New letter",
//   html: "New order",
// };
// sgMail
//   .send(mail)
//   .then(() => console.log("Email send is sucess"))
//   .catch((error) => console.log(error.message));

