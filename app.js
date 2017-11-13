const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
app.set('view,', './views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=> {
	res.render('./index')




});


app.listen(3000,()=> {
	console.log('Listening on port 3000...')
})