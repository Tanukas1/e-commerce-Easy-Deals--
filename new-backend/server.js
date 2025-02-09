require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminProductRoutes = require('./routes/adminProductRoutes');
const adminProductGetRoutes = require('./routes/adminProductGetRoutes');
const adminEditProductRoutes = require("./routes/adminEditProductRoutes"); 
const adminDeleteProductRoutes = require("./routes/adminDeleteProductRoutes"); 
const adminCategoryRoutes = require('./routes/adminCategoryRoutes');
const adminCategoryEditRoutes = require('./routes/adminCategoryEditRoutes')
const adminCategoryDeleteRoutes = require('./routes/adminCategoryDeleteRoutes')
const userProductbyCategoryRoutes = require('./routes/userProductbyCategoryRoutes');
const userGetProductRoutes = require('./routes/userGetProductRoutes');
const orderRoutes = require('./routes/orderRoutes');


const app = express();

app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

app.use('/public', express.static(path.join(__dirname, 'public')));
// Basic GET API route

// Signup and Signin API routes
app.use('/auth', authRoutes);

// admin
app.use('/admin', adminRoutes);
app.use('/admin', adminRoutes);

app.use('/admin', adminProductRoutes);
app.use('/admin', adminProductGetRoutes);
app.use("/admin", adminEditProductRoutes);
app.use("/admin", adminDeleteProductRoutes);
app.use('/user',  userProductbyCategoryRoutes);
app.use('/user',  userGetProductRoutes);

app.use('/admin', adminCategoryRoutes);
app.use('/admin', adminCategoryEditRoutes)
app.use('/admin', adminCategoryDeleteRoutes)

app.use('/', orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
