const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

//app.use works in order of written code...next() function calls the next middleware

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n', (err)=>{
    if (err) {
      console.log('Unable to log info');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   // middleware to show a page and stop it here as next() is not called. So after this nothing will be executed
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{

  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  // return text.toUpperCase();
  return '';
});
app.get('/', (req, res)=>{

    // res.send('Hello Express ');

    // res.send({
    //   name : 'Shubham',
    //   likes: [
    //     'Fashion', 'Eating'
    //   ]
    // });

    res.render('home.hbs', {
      username : 'Shubham Gupta',
      pageTitle: 'Home Page',
    });
});

app.get('/about', (req, res)=>{
  // res.send(' <h1>HI. I\'m  learning Node.js. This is my first website..Soon more stuff is coming so stay tuned </h1>');
  res.render('about.hbs',{
    pageTitle: 'About Us',
  });
});


app.get('/projects', (req, res)=>{
  // res.send(' <h1>HI. I\'m  learning Node.js. This is my first website..Soon more stuff is coming so stay tuned </h1>');
  res.render('projects.hbs',{
    pageTitle: 'My Projects'
  });
});


app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to fetch content..Try again in some time'
  });
});

app.listen(port, ()=>{
  console.log(`Starting our server on port: ${port}`);
});
