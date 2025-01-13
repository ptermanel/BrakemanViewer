const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('brakemanReport'), (req, res) => {
  try {
    const file = req.file;
    const report = JSON.parse(fs.readFileSync(file.path, 'utf8'));
    fs.unlinkSync(file.path);
    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
