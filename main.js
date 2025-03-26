require('dotenv').config()
const express = require('express')
const db = require("./dbConfig");
const { urlencoded } = require('express')
const app = express()
const port = 5500
var cors = require('cors')
app.use(cors())



app.use(express.json());

app.use(urlencoded({extended:false}))

app.get('/', async (req, res) => {

    try {
        const data = await db.query('select am.entityname ,am.entityhomepage ,am."cluster" ,am.description ,am.logo_do ,am.isactive from apilandscape.apiprovidersmain');
        
        if (data.rowCount < 1) {
          return res.status(404).send('no data found')
        }
        const response = data.rows;
        response.forEach((element,index) => {
          element.id=index
        });
        console.log(response)
        res.send(response.sort(function(a,b) {
          return a.entityname - b.entityname;
      }));
      }catch(error) {
        console.log("error del server", error)
        return res.status(500).send('An error ocurred')
      }
})

app.get('/:entityname', async (req, res) => {
  const { entityname } = req.params;

  console.log("entityname",entityname)
    
  try {
      const data = await db.query('select * from apilandscape.apiprovidersmain where entityname = $1', [entityname]);
      
      if (data.rowCount < 1) {
        return res.status(404).send('no data found')
      }
      const response = data.rows;

      res.send(response);
    }catch(error) {
      console.log("error del server", error)
      return res.status(500).send('An error ocurred')
    }
})

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
  } else {
    console.error('Server error:', err);
  }
});

// Add error handling for database connection
db.on('error', (err) => {
  console.error('Database connection error:', err);
});