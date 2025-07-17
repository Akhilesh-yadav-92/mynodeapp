// const express=require('express')
// const cors=require('cors')
// const dotenv=require('dotenv')
// const colors=require('colors')
// const morgan=require('morgan')
// const connectDB = require('./config/db')

// dotenv.config()


// connectDB()

// //rest object

// const app=express()

// //middlewares
// app.use(cors())
// app.use(express.json())
// app.use(morgan('dev'))

// //routes

// app.use("/api/v1/auth",require('./routes/userRoutes'))



//  const PORT = process.env.PORT || 4000;
// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`.bgGreen.white,)
// })



// =============================


// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Allow all origins for dev
//   }
// });

// // Send data on connection or on update
// io.on('connection', (socket) => {
//   console.log('Client connected');

//   // Send test data every 10 seconds
//   setInterval(() => {
//     socket.emit('dataUpdated', {
//       message: 'New server data akhllilesjkjkh!',
//       timestamp: new Date().toISOString(),
//     });
//   }, 5000); // every 10 seconds

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// server.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });


// ===============


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow access from anywhere (for testing)
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.emit('dataUpdated', {
    message: 'Welcome from server!',
    time: new Date().toISOString(),
  },5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
