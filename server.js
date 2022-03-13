var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.set('view engine', 'ejs')

let date = new Date()

// your first API endpoint...
app.get('/', function (req, res) {
  const date = new Date()
  res.render('index', {
    date: `${date.getUTCFullYear()} - ${
      date.getUTCMonth() + 1
    } - ${date.getUTCDate()}`,
    dateURL: `${date.getUTCFullYear().toString()}-${(
      date.getUTCMonth() + 1
    ).toString()}-${date.getUTCDate().toString()}`,
    dateTime: date.getTime(),
    dateAll: date.toUTCString(),
  })
})

app.get(`/api/:time`, (req, res) => {
  let time = req.params.time
  if (time.startsWith('2')) {
    res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    })
  } else {
    res.json({
      unix: Number(time),
      utc: date.toUTCString(),
    })
  }
})

app.listen(5500)
