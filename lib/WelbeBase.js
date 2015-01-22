var requestP = require('request')
var serr = require('std-error')
var sc = require('statuscode')
var jar = requestP.jar()
var request = requestP.defaults({jar: jar})
var apiDesc = require('./WelbeDesc')
var _ = require('underscore')
var TEMPLATE_REGEX = /\{\{(.+?)\}\}/g


function WelbeBase(email, password, welbeRoot) {
  this.extendWithDesc(apiDesc)
  this.apiRoot = welbeRoot || 'https://www.welbe.com'
  this.loggedIn = false
  this.userId = null
}

WelbeBase.prototype.buildUrl = function(path) {
  return this.apiRoot + path
}


WelbeBase.prototype.login = function(cb) {
  if (this.loggedIn) return process.nextTick(cb)
  var self = this
  // welbe responds with a 302 if we are properly logged in and check for remember token
  request.post(this.buildUrl("/sessions"), {form: {session: {email: "ahigham@instructure.com", password: "Star1234"}}}, function(err, resp) {
    if (err) return cb(err)
    if (resp.statusCode !== 302) return cb(new serr.Unauthorized("Login to welbe failed, check your creds"))
    // also check for cookie set?
    self.loggedIn = true
    self.makeRequest("get", "/users/current", function(err, userInfo) {
      if (err) return cb(err)
      self.userId = userInfo.user.id
      cb()
    })
  })
}

WelbeBase.prototype.makeRequest = function(method, path, requestBody, cb) {
  if (typeof requestBody === "function") {
    cb = requestBody
    requestBody = null
  }
  var self = this
  this.login(function(err) {
    if (err) return cb(err)
    var apiUrl = self.buildUrl("/api" + path)
    var opts = {method: method.toUpperCase(), url: apiUrl, json:true}
    if (requestBody) {
      opts.body = requestBody
    }
    request(opts, function(err, resp, body) {
      if (err) return cb(err)
      if (!sc.accept(resp.statusCode, 20)) return cb(new Error('failed to make request, return ' + resp.statusCode))
      cb(null, body)
    })
  })
}

WelbeBase.prototype.extendWithDesc = function(desc) {
  for (var name in desc) {
    this[name] = this.makeFunction(desc[name])
  }
}

WelbeBase.prototype.makeFunction = function(desc) {
  var self = this
  var method = desc.method
  var paramDesc = desc.params
  var tempFun = _.template(desc.url, {interpolate: TEMPLATE_REGEX})
  var fieldName = desc.fieldName
  return function(params, cb) {
    self.login(function(err) {
      if (err) return cb(err)
      var tContext = {userId: self.userId}
      if (method === "get") {
        Object.keys(paramDesc).forEach(function(k) {
          tContext[k] = params[k]
        })
        params = null
      } else {
        var wrapper = {}
        wrapper[fieldName] = params
        params = wrapper
      }
      var resolvedUrl = tempFun(tContext)
      self.makeRequest(method, resolvedUrl, params, cb)
    })
  }
}
module.exports = WelbeBase
