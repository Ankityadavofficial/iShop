const express = require('express'); // Fix typo in 'express'
const connection = require('./connection');
const cors = require('cors');
require('dotenv').config();

const CategoryRouter = require('./routes/CategoryRouter');
const ProductRouter = require('./routes/ProductRouter');
const ColorRouter = require('./routes/ColorRouter');
const AdminRouter = require('./routes/AdminRouter');
const AccessoriesRouter = require('./routes/AccessoriesRouter');
const UserRouter = require('./routes/UserRouter');
const OrderRouter = require('./routes/OrderRouter');

const server = express();
server.use(express.json()); // Fix typo in 'express'

// ✅ Fix CORS to allow requests from frontend (Render)
const corsOptions = {
    origin: ['http://localhost:5173', 'https://ishop-frontend-vtq7.onrender.com'], // Add your deployed frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
server.use(cors(corsOptions));

server.use(express.static("./public"));

// ✅ Router grouping
server.use("/category", CategoryRouter);
server.use("/product", ProductRouter);
server.use("/color", ColorRouter);
server.use("/admin", AdminRouter);
server.use("/accessories", AccessoriesRouter);
server.use("/user", UserRouter);
server.use("/order", OrderRouter);

// ✅ Connect to MongoDB and start server
connection()
    .then(() => {
        console.log("DB connected successfully");
        server.listen(5000, () => {
            console.log("Server started on port 5000");
        });
    })
    .catch((err) => {
        console.log("DB not connected:", err.message);
    });
