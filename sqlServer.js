const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 5000; 
 
const config = {
  user: 'maqadmin',
  password: '#1Password',
  server: 'sepbootcamp.database.windows.net',
  database: 'Sep2bootcampDB',
  options: {
    encrypt: true, 
    trustServerCertificate: true
  }
};
 
const corsOptions = {
  origin: '*',
  methods: 'GET',
  allowedHeaders: '*', 
  exposedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true, 
};
 
app.use(cors(corsOptions));

sql.connect(config, (err) => {
  if (err) console.error('SQL connection error:', err);
});
 
app.get('/',async(res,res)=>{
  res.send("Api Started Successfully")
})
app.get('/api/task2', async (req, res) => {
  try {
    const result = await sql.query('SELECT TOP 20 * FROM  [SalesLT].[Customer]');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});
 
app.get('/api/task3', async (req, res) => {
  try {
    const result = await sql.query('SELECT p.Name,p.Color,p.Size,p.Weight FROM [SalesLT].[Product] p INNER JOIN [SalesLT].[ProductCategory] pc ON p.ProductCategoryID = pc.ProductCategoryID;');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 