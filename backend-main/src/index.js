const express=require('express');
require("dotenv").config();
const app=express();

const dbConfig=require('./db-config/db')
const roomsRoute=require('../routes/roomsRoute');
const usersRoute=require('../routes/usersRoute');
const bookingsRoute=require('../routes/bookingsRoute'); 
const apartmentsRoute=require('../routes/apartmentsRoute'); 
const bookApRoute=require('../routes/bookApRoute'); 
const cors=require('cors');
const dataSeeder=require('../controller/seeder')

app.use(express.json());
app.use(cors());
//dataSeeder();


app.use('/api/rooms',roomsRoute)
app.use('/api/users',usersRoute)
app.use('/api/bookings',bookingsRoute)
app.use('/api/bookingsAP',bookApRoute)
app.use('/api/apartments',apartmentsRoute)

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log('server running...'+port));