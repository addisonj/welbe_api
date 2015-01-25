#!/usr/bin/env node
var program = require('commander')
var fs = require('fs')
var path = require('path')
var pack = require('../package.json')
var WelbeApi = require('../')
var apiDesc = require('../lib/WelbeDesc')

program = program
  .version(pack.version)
  .option('-c --config <path>', 'defaults to ~/.welbe.json')


var commands = {}
for (var key in apiDesc) {
  buildCommand(key)
}
program.command('help <command>').description('Show help for an action').action(function(commandName) {
  if (!commands[commandName]) {
    console.log(commandName + " is not a valid command")
    program.outputHelp()
    process.exit(1)
  }
  commands[commandName].outputHelp()
  process.exit()
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  console.log('No command provided')
  program.outputHelp()
  process.exit(1)
}

function buildCommand(key) {
  var method = apiDesc[key]
  var subCommand = program.command(key)
  subCommand.description(method.desc || "")
  commands[key] = subCommand
  var shortParams = {}
  var longToShort = {}
  for (var param in method.params) {
    var shortParam = param.charAt(0)
    while (shortParams[shortParam]) {
      if (shortParam.toUpperCase() === shortParam) {
        shortParam = String.fromCharCode(shortParam.charCodeAt(0) + 1)
      } else {
        shortParam = shortParam.toUpperCase()
      }
    }
    shortParams[shortParam] = true
    longToShort[param] = shortParam
  }
  for (var param in method.params) {
    var info = method.params[param]
    var shortParam = longToShort[param]
    var type = null
    var processor = null
    var desc = null
    var defaultDesc = null
    if (typeof info === "string") {
      type = info
      processor = getProcessor(info)
    } else {
      type = info.type
      processor = getProcessor(type)
      desc = info.desc
      if (typeof info.default === "function") {
        defaultDesc = info.defaultDesc
      } else {
        defaultDesc = info.default
      }
    }
    desc = desc || ""
    if (defaultDesc) {
      desc += " Defaults to " + defaultDesc
    }
    if (type === "array") {
      desc += " NOTE: seperate options with a comma, ex: a,b,c"
    }
    var optKey = '-' + shortParam + ', --' + param + " <" + type + ">"
    subCommand.option(optKey, desc, processor)
  }
  subCommand.action(function() {
    var params = {}
    for (var param in method.params) {
      params[param] = subCommand[param]
    }
    runCommand(key, params, program)
  })
}

function runCommand(name, params, opts) {
  var creds = getCreds(opts.config)
  var api = new WelbeApi(creds.email, creds.password)

  api[name](params, function(err, resp) {
    if (err) {
      console.log('something went wrong')
      throw err
    }
    console.log(JSON.stringify(resp, 0, 2))
  })
}

function getCreds(configParam) {
  var email = process.env['WELBE_EMAIL']
  var password = process.env['WELBE_PASSWORD']
  if (email && password) {
    return {email: email, password: password}
  }

  configParam = configParam || path.join(process.env['HOME'], '.welbe.json')
  var configFile = path.resolve(process.cwd(), configParam)
  if (!fs.existsSync(configFile)) {
    throw new Error('no config found at ' + configFile)
  }
  var config = require(configFile)
  if (!config.email && !config.password) {
    throw new Error('invalid config file, missing email or password')
  }
  return config
}

function getProcessor(type) {
  switch (type) {
    case "string":
      return null
    case "number":
      return parseInt
    case "array":
      return function(s) { return s.spllit(',') }
    default:
      return null
  }
}
