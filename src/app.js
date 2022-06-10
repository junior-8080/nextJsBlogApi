const  express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 3004;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const post = require('./router');




app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/v1/api",post);
mongoose.connect(process.env.MONGO_DB_CONNECTING_STRING,{useNewUrlParser: true,useUnifiedTopology:true})
.then((connect) => {
     console.log('mongo is connected')
})
.catch(err => console.log(err))

app.listen(PORT,()=> {console.log(`app running on port : ${PORT}`)});