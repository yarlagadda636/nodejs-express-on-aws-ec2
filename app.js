const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Express Demo App</h1> <h4>Message: Success</h4> <p>Version 2.1</p>');
})

app.get('/products', (req, res) => {
  res.send([
    {
      productId: '1001',
      price: 1000
    },
    {
      productId: '1002',
      price: 1500
    }
  ])
})

app.listen(port, ()=> {
  console.log(`Demo app is up and listening to port: ${port}`);
})
 
