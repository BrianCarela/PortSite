//dependencies
const express = require('express'),
      morgan = require('morgan'),
      cors = require('cors'),
      mailer = require('express-mailer'),
      mustacheExpress = require('mustache-express'),
      PORT = process.env.PORT || 3000;

// testing local heroku changes
var cool = require('cool-ascii-faces');


//hook up app
const app = express();
app.set('views', __dirname+'/views');
app.engine('html', mustacheExpress())
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'))

//hook up morgan
app.use(morgan('dev'));

//hook up cors
app.use(cors())

//configure dotenv stuff
require('dotenv').config();

//configure mailer
mailer.extend(app, {
  from: 'noreply@briancarela.com',
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP',
  auth: {
    user: 'briancarela@gmail.com',
    password: process.env.GMAIL_PASS
  }
});

// this is dumb testing stuff
app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/', (req, res) =>{
  res.render('index');
})

app.post('/email', (req, res, next) => {
  res.mailer.send('email', {
    to: 'briancarela@gmail.com',
    subject: 'test email'
  }, (error) =>{
    if (error){
    res.send(error)
    return
  };
  res.send('email sent')
  });
});

//check for life
app.listen(PORT, () =>{
  console.log(`ALIVE ON PORT ${PORT}`);
})
