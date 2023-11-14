const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const adminAuthRoute = require('./Routes/AdminAuthRoute'); // Include the new admin route
const { MONGO_URL, PORT } = process.env;
const visitorRoute = require('./Routes/NewVisitor') ; 
const bodyParser = require('body-parser');

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(bodyParser.json());

// Use the visitor checkout route
//app.use('/visitor/checkout', visitorCheckoutRouter);

app.use(express.json());

app.use('/', authRoute); // User authentication routes
app.use('/admin', adminAuthRoute); // Admin authentication routes
app.use('/visitor', visitorRoute) ; 
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});
