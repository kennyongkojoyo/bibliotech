//initialize library
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

//hbs initialization
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {return new Date().getFullYear()});

// express initialization
var app = express();
app.set('view engine', 'hbs');

// server logger
app.use((req,res, next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	fs.appendFile('server.log', log, (err) => {
		if(err){
			console.log(`${now} : unable to append log`);
		}
	})
	next();
});

//pages
//home
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle:'Home Page',
	});
});

//about
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle:'About Page',
	});
});


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
