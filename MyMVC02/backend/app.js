const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const addressRoutes = require("./routes/addressRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "mymvc02 backend server running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
