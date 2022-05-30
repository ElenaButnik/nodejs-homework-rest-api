const { User } = require("../../models/User");
const { createError, schemas, sendMail } = require("../../helpers");

const verifyPost = async (req, res, next) => {
  const { error } = schemas.verifyEmail.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401);
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "New letter",
    html: `<a target = '_blank' href = 'localhost:3000/api/users/verify/${user.verificationToken}'>Please type to confirm yuor email</a>`,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = verifyPost;
