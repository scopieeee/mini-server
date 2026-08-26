const express = require("express");
const app = express();

// middleware to parse json bodies
app.use(express.json());

// log requests
app.use((req, res, next) => {
    const logData = {
        time: new Date(),
        ip: req.header["x-forwarded-for"] || req.ip,
        method: req.method,
        userAgent: req.header["user-agents"]
    };

    console.log("\n Request Logged");
    console.log(logData);
    next();
});

// api endpoint for getting the user info
app.get("/", (req, res) => {
    res.send("Server is running...")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

