var express = require('express');
var app = express();
var cors = require('cors');
var multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config()

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST /api/fileanalyse
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  else {
    const file = req.file;
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    });
  }
});

const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
