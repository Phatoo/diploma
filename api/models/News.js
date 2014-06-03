/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
// The Customer model
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10
var TOKEN_TIME = 86400000
var mongoose = require('mongoose')
  , crypto = require('crypto')
  , ObjectId = require('mongoose').Types.ObjectId
  , Serialize = global.Serialize
  , bcrypt = require('bcrypt')

module.exports = {

  attributes: {
    handler: 'string'
    ,body: 'string'
  }
};



// customerSchema.virtual('password').set(function(password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
// }).get(function() {
//     return this._password;
// });

// var methods = {

//     authenticate: function(plainText) {
//         return this.encryptPassword(plainText) === this.hashed_password;
//     },

//     makeSalt: function() {
//         return crypto.randomBytes(16).toString('base64');
//     },

//     encryptPassword: function(password) {
//         if (!password || !this.salt) return '';
//         var salt = new Buffer(this.salt, 'base64');
//         return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
//     }
// };
