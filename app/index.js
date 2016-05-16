// app/index.js
const express = require('express')  
const test_counter = require('./test_code.js')
const app = express()  
const port = 3000

app.get('/', (request, response) => {  
	test_counter.increment();
  response.send('Hello from Express via GitHub & AWS CodeDeploy!')
})

app.get('/timings', function(req, res){
	res.send(req);
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})