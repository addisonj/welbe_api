var fs = require('fs')
var path = require('path')
var handlebars = require('handlebars')
var apiDesc = require('../lib/WelbeDesc')

handlebars.registerHelper('paramLine', function(obj) {
  var text = "**type:** "
  if (typeof obj !== "object") {
    text += obj
    return text
  }

  text += obj.type + ", **description:** " + obj.desc
  if (obj.default) {
    text += ", **default:** "
    if (typeof obj.default === "function") {
      text += obj.defaultDesc
    } else {
      text += obj.default
    }
  }
  return text
})
var templateFile = fs.readFileSync(path.resolve(__dirname + '/docs.md.hbs'), 'utf8')
var template = handlebars.compile(templateFile)

var res = template({methods: apiDesc})

fs.writeFileSync(path.resolve(__dirname, '../docs.md'), res)


