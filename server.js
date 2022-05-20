var express = require('express')
var app = express()
const path = require('path')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')

// your first API endpoint...
app.get('/', function (req, res) {
  const date = new Date()
  res.render(path.join(__dirname + '/views/index.ejs'), {
    date: `${date.getUTCFullYear()}-${
      date.getUTCMonth() + 1 < 10
        ? '0' + (date.getUTCMonth() + 1).toString()
        : date.getUTCMonth() + 1
    }-${date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate()}`,
    dateTime: date.getTime(),
    dateAll: date.toUTCString(),
  })
})

app.get('/api', (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  })
})

app.get(`/api/:data_string`, (req, res) => {
  const date_string = req.params.data_string
  const fixDate = date_string
    .split('-')
    .map((value) => {
      if (value.length === 1) {
        return '0' + value
      }
      return value
    })
    .join('-')

  if (/\d{5,}/.test(date_string)) {
    res.json({
      unix: new Date(Number(fixDate)).getTime(),
      utc: new Date(Number(fixDate)).toUTCString(),
    })
  } else if (new Date(date_string).toString() === 'Invalid Date') {
    res.json({
      error: 'Invalid Date',
    })
  } else {
    res.json({
      unix: new Date(fixDate).getTime(),
      utc: new Date(fixDate).toUTCString(),
    })
  }
})

var port = process.env.PORT || 5500
app.listen(port)
