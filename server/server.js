const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const applicationRoutes = require("./routes/applicationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const brochureRoutes = require("./routes/brochureRoutes");
const invoiceRoutes =
  require(
    "./routes/invoiceRoutes"
  );

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/brochure", brochureRoutes);
app.use(
  "/api/invoice",
  invoiceRoutes
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});