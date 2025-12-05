const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve index.html etc.

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Schema with all fields
const DocumentSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: String,
  achievements: String,
  mobileNumber: String,
  file: Buffer,
  fileType: String,
  fileName: String,
  uploadedAt: { type: Date, default: Date.now }
});

const Document = mongoose.model("Document", DocumentSchema);

// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Route
app.post("/upload", upload.single("document"), async (req, res) => {
  try {
    const doc = new Document({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      achievements: req.body.achievements,
      mobileNumber: req.body.mobileNumber,
      file: req.file.buffer,
      fileType: req.file.mimetype,
      fileName: req.file.originalname
    });

    await doc.save();
    res.status(200).json({ message: "Details submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sample data route
app.get("/associations", (req, res) => {
  res.json({
    tamilnadu: "Tamil Nadu Football Association",
    kanchipuram: "Kanchipuram Football Association"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
