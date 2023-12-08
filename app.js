if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require ('cors')
const { errHandler } = require('./middlewares/errorHandling');
const router = require('./routes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
res.send('Hello World!')
})
app.use(router);
app.use(errHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app