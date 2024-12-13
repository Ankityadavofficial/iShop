const express = require('express');
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
server.use(express.json());

// CORS options
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigin = [process.env.CLIENT_URL || 'http://localhost:5173']; // Use environment variable for client URL
        if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

server.use(cors(corsOptions));
server.use(express.static("./public"));

// Router grouping
server.use("/category", CategoryRouter);
server.use('/product', ProductRouter);
server.use("/color", ColorRouter);
server.use("/admin", AdminRouter);
server.use("/accessories", AccessoriesRouter);
server.use('/user', UserRouter);
server.use('/order', OrderRouter);

// Connect to database and start the server
connection()
    .then(() => {
        console.log("DB connected successfully");
        const PORT = process.env.PORT || 5000; // Use dynamic port provided by Render
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(() => {
        console.log("DB not connected");
    });
