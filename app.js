const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const USER_MODEL = require("./API/models/user.model");
const Routes = require("./API/routes/routes");
const app = express();

app.use(express.json());
app.use(cors());

const mongooseLink = "mongodb+srv://omre:omre1@moreproject.g3yw6qr.mongodb.net/?retryWrites=true&w=majority&appName=moreproject";

mongoose.connect(mongooseLink);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});
console.log("lw")
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.use("/",Routes)

const sleep = () => {
  return new Promise((resolve) => setTimeout(resolve, 3000));
};

app.get("/abc", (req, res) => {
  res.status(200).json({
    fullname: "omre assi",
  });
});
app.get("/", (req, res) => {
  res.status(200).json({
    stats:"live",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    stats:"live",
  });
});

app.delete("/d", async (req, res) => {
  try {
    await sleep();
    res.status(200).json({
      fullname: "delayed response",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: "An error occurred during sleep",
    });
  }
});

app.delete("/c", async (req, res) => {
  try {
    await sleep();
    res.status(200).json({
      fullname: "delayed response",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: "An error occurred during sleep",
    });
  }
});

app.post("/whatsmyname", (req, res) => {
  const { firstname, lastname, ihsan } = req.body;

  if (!firstname || !lastname) {
    return res.status(400).json({
      error: true,
      errormessage: "Firstname and lastname are required!",
      ihsan: ihsan,
    });
  }
  res.status(200).json({
    fullname: `${firstname} ${lastname}`,
  });
});

app.get("/fullname1", (req, res) => {
  res.status(200).json({
    fullname1: "yazan nedal baluom",
  });
});

app.post("/whatsmyname1", (req, res) => {
  const { firstname1, dadname1, lastname1 } = req.body;

  if (!firstname1 || !dadname1 || !lastname1) {
    return res.status(400).json({
      error: true,
      errormessage: "Firstname1, dadname1, and lastname1 are required!",
    });
  }
  res.status(200).json({
    fullname: `${firstname1} ${dadname1} ${lastname1}`,
  });
});

app.post("/CountNames", (req, res) => {
  const { Array } = req.body;
  if (!Array || !Array.length) {
    return res.status(400).json({
      error: true,
      errormessage: "Array is required and cannot be empty",
    });
  }
  res.status(200).json({
    NamesNumber: Array.length,
  });
});

app.post("/Log-in", (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password) {
    return res.status(400).json({
      error: true,
      errormessage: "Username and Password are required",
    });
  }

  if (Username.length < 4 || Password.length < 6) {
    return res.status(400).json({
      error: true,
      errormessage:
        "Username should be 4 characters long or more and Password should be 6 characters long or more",
    });
  }

  res.status(200).json({
    Login: "success",
  });
});

app.post("/isthesameuser", (req, res) => {
  const { user1, user2 } = req.body;

  if (user1.name === user2.name && user1.Password === user2.Password) {
    return res.status(200).json({
      Login: "success",
    });
  } else {
    return res.status(400).json({
      error: true,
      errormessage: "Both usernames and passwords should match",
    });
  }
});

app.post("/createuser", async (req, res) => {
  try {
    const { name, age, pass, phone } = req.body;
    const user = await USER_MODEL.create({
      name,
      age,
      pass,
      phone
    });

    res.status(200).json({
      user: user,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
});

app.post("/createusers", async (req, res) => {
  try {
    const usersData = req.body.users; // Expecting an array of user objects

    if (!Array.isArray(usersData) || usersData.length === 0) {
      return res.status(400).json({
        error: true,
        errormessage: "A non-empty array of users is required",
      });
    }

    // Create multiple users in the database
    const users = await USER_MODEL.insertMany(usersData,{throwOnValidationError:true});

    res.status(200).json({
      users: users,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
});



module.exports = app;
