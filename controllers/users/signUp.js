const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { createError, sendMail } = require("../../helpers");
const { User, schemas } = require("../../models/User");

const signUp = async (req, res, next) => {
  const { error } = schemas.users.validate(req.body);
  if (error) {
    throw createError(400, "Invalid email or password");
  }
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "New letter",
    html: `<a target = '_blank' href = 'localhost:3000/api/users/verify/${verificationToken}'>Please type to confirm yuor email</a>`,
  };
  await sendMail(mail);
  res.status(201).json({
    user: { email },
  });
};

module.exports = signUp;
