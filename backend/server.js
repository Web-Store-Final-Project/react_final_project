require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/itemsRout.js");
const userRoutes = require("./routes/userRout");
const orderRoutes = require("./routes/orderRout.js");
const burtonScraper = require("./scrapers/scrapeBurton.js");
const billabongScraper = require("./scrapers/scrapeBillabong.js");
const quikScraper = require("./scrapers/scrapeQuiksilver.js");
const Item = require("./models/itemModel");
const User = require("./models/User");
var cors = require("cors");

// express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  next();
});

// websocket
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(
      `User with ID: ${socket.id} joined room: ${data.room} sent message ${data.message} `
    );
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Websocket server is running on port 3001");
});

//----------------------------------------//
//routes
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

//connect to db
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to db & listening on port",
        process.env.PORT,
        "!!"
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//scraping once a week
checkForScrape();
// billabongScraper.apply()
// quikScraper.app/ly()

async function checkForScrape() {
  const nowInMs = Date.now();
  const threeDaysInMs = 259200000;

  const before3DaysMs = nowInMs - threeDaysInMs;
  const scrapedItem = await Item.findOne(
    { scrippedSiteName: "BILLABONG" },
    "date"
  ).exec();
  if (scrapedItem === null || scrapedItem.date < before3DaysMs) {
    Item.deleteMany({ scrippedSiteName: "RVCA" }, function (err) {
      if (err) console.log(err);
      console.log("deleted successfuly");
    });
    Item.deleteMany({ scrippedSiteName: "QUIKSILVER" }, function (err) {
      if (err) console.log(err);
      console.log("deleted successfuly");
    });
    Item.deleteMany({ scrippedSiteName: "BILLABONG" }, function (err) {
      if (err) console.log(err);
      console.log("deleted successfuly");
    });

    // burtonScraper.apply();
    quikScraper.apply();
    billabongScraper.apply();
  }
}
