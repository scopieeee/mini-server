const dns = require("dns");
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.route");
const dotenv = require("dotenv");

// Fix: local DNS server doesn't support SRV lookups required by mongodb+srv://
// Switch to Google DNS (8.8.8.8) and Cloudflare (1.1.1.1) before connecting
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config()


const app = express();
app.use(express.json());

// connect to Db
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.log("Database connection failed", error);
    });


app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: "server running",
    })
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})


module.exports = app;
