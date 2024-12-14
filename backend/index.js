const exprees = require('express');
const connection = require('./connection');
const cors = require('cors');
require('dotenv').config()

const CategoryRouter = require('./routes/CategoryRouter');
const ProductRouter = require('./routes/ProductRouter');
const ColorRouter = require('./routes/ColorRouter');
const AdminRouter = require('./routes/AdminRouter');
const AccessoriesRouter = require('./routes/AccessoriesRouter');
const UserRouter = require('./routes/UserRouter');
const OrderRouter = require('./routes/OrderRouter');

// console.log(process.env.RAZORPAY_KEY_SECRET);
const server = exprees();
server.use(exprees.json());


const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigin = ['http://localhost:5173'];
        if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

server.use(cors(corsOptions));
server.use(exprees.static("./public"));
// router grouping
server.use("/category", CategoryRouter)
server.use('/product', ProductRouter)
server.use("/color", ColorRouter)
server.use("/admin", AdminRouter)
server.use("/accessories", AccessoriesRouter)
server.use('/user', UserRouter)
server.use('/order', OrderRouter)
connection()
    .then(
        () => {
            console.log("db connected sucessfully");
            server.listen(
                5000,
                () => { console.log("server start") }
            )
        }
    )
    .catch(
        () => {
            console.log("DB not connected");
        }
    )

// const server = exprees();
server.use(exprees.json());

const PORT = process.env.PORT || 5002;  // Use 5002 instead of 5002
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
