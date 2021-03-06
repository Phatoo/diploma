
var mongoose = require('mongoose')
  , ObjectId = require('mongoose').Types.ObjectId
  , Buffer = require('mongoose').Types.Buffer
  , String = require('mongoose').Types.String

module.exports = {

  attributes: {
    name: 'string'
    ,description: 'string'
    ,local_url: 'string'
    ,imgData: Buffer
    ,imgContentType: 'string'
  }
};