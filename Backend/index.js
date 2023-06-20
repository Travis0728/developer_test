// Create basic express app

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(fileUpload());

app.post("/upload", (req, res) => {
  const folderPath = path.join(__dirname, "uploads");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  file.mv(path.join(__dirname, "uploads", file.name), (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("File uploaded!");
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
