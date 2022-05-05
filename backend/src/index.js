const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { customerRouter } = require("./routes/customer-routes");
const { userRouter } = require("./routes/user-routes");
const { productRouter } = require("./routes/product-routes")

const PORT = process.env.PORT || 9000;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("it works....")
})

app.use("/api/customers", customerRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(PORT, () => console.log("Server listen on port: ", PORT));