const express = require("express");
const bodyParser = require("body-parser");
const process = require("process");
const app = express();
const port = process.env.PORT || 3000;
const { Worker, isMainThread, workerData } = require("worker_threads");
const mongoose = require("mongoose");
const multer = require("multer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./resources/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + ".csv");
  },
});
const upload = multer({ storage: storage });

var uri = 'mongodb+srv://kushal:Kushal24@cluster0.q2aawhd.mongodb.net/test';
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.post("/upload", upload.single("datasheet"), (req, res) => {
  /* code here to call worker thread*/
  if (isMainThread) {
    const worker = new Worker(__filename, { workerData: 'Hello, world!' });
  } else {
    console.log(workerData);  
  }
  
  try {
    let input = Array.isArray(req.body);

    if (input) {
      let lists = req.body;
      lists.map(async (user) => {
        const data = await contacts.create({
          
        });
      });
      res.json({ message: "success" });
    } 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
