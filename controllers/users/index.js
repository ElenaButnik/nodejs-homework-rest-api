const signUp = require('./signUp');
const logIn = require('./logIn');
const current = require('./current');
const logOut = require('./logOut');
const subscription = require('./subscription');
const avatars = require('./avatars');
const verify = require('./verify');
const verifyPost = require('./verifyPost');

module.exports = {
    signUp,
    logIn,
    current,
    logOut,
    subscription, 
    avatars,
    verify,
    verifyPost
}