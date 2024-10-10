require("dotenv").config();
const express = require("express"); // Import express with non-module
require("express-async-errors");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const { notFoundURLHandler, errorHandler } = require("./middlewares/errors");

/* Make/initiate expess application */
const app = express();
const port = process.env.PORT || 5000;

/* We need to activate body parser/reader */
app.use(express.json());

// We need to read form-body to upload file
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use("/", router);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Halo, ini adalah latihan untuk mempelajari RESTful API")
})
/* Run the express.js application */
app.listen(port, () => {
    console.log(`The express.js app is runing on port ${port}`);
});
