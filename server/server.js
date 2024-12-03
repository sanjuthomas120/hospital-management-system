const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const Auth = require("./models/Auth");
const path = require('path');

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.json());


const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));


io.on("connection", async (socket) => {
  console.log("A user connected:", socket.id);
  const userId = socket.handshake.query.userId;
  console.log("Received userId:", userId);

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    console.log("Invalid or missing userId");
    return;
  }

  try {
    const user = await Auth.findOne({ userId });
    if (!user) {
      console.log("User not found in database.");
      return;
    }

    const userType = user.userTypeModel;
    console.log(`User type: ${userType} joined room`);

    const roomId = "roomId"; 
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userType);
   
    socket.on("offer", (data) => {
      console.log("Received offer:", data);
      socket.to(data.room).emit("offer", data);
    });

    socket.on("answer", (data) => {
      console.log("Received answer:", data);
      socket.to(data.room).emit("answer", data);
    });

    socket.on("candidate", (data) => {
      console.log("Received candidate:", data);
      socket.to(data.room).emit("candidate", data);
    });
  } catch (error) {
    console.log("Error fetching user or during Socket.IO events:", error);
  }

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const labRoutes = require("./routes/labRoutes");
const accountRoutes = require('./routes/accountRoutes');

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);
app.use("/pharmacy", pharmacyRoutes);
app.use("/lab", labRoutes);
app.use('/account',accountRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
