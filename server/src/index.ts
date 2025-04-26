import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";
import questionRouter from "./routes/question.routes.js";
import contestRouter from "./routes/contest.routes.js";
import UserModel from "./models/user.model.js";
import { check } from "express-validator";
import leaderboardRouter from "./routes/leaderboard.routes.js";
import submissionRouter from "./routes/submission.routes.js";
import postRouter from "./routes/post.routes.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import judgeRouter from './routes/judge.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from "cookie-parser";


dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();

app.use(
  cors({
    origin:"http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS',],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,  // Allow cookies in cross-origin requests
  })
);

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/question", questionRouter);
app.use("/api/contests", contestRouter);
app.use("/api/leaderboard", leaderboardRouter)
app.use("/api/submission", submissionRouter)
app.use("/api/discussion", postRouter)
app.use("/api/judge", judgeRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
  res.send({ success: true, message: "cors server up!" });
});

app.get("/getAccessToken", async function (req, res) {
  /**
   * request body being sent to github API
   */
  const requestBody = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.query.code,
    redirect_uri: process.env.GITHUB_REDIRECT_URI,
  };

  try {
    const { data } = await axios.post(
      "https://github.com/login/oauth/access_token/",
      requestBody,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token } = data;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userData = userResponse.data;

    let user = await UserModel.findOne({
      gitHubUsername: userData.login,
    });

    //checking if user already exists, if they exist return access token immediately
    if (user) {
      // Update the user's access token if it has changed
      user.accessToken = access_token;

      await user.save();

      return res
        .status(200)
        .json({ message: "Welcome! Repeat user", access_token });
    }

  // If the user doesn't exist, create a new user
    user = new UserModel({
      gitHubUsername: userData.login,
      accessToken: access_token,
      profilePhoto: userData.avatar_url,
      role: "participant", //defaulting to participant
    });

    await user.save();

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  
      sameSite: "lax", // Prevent CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/", // Ensure the cookie is accessible on the entire site
    });

    res.json({
      message: "User authenticated and saved successfully",
      user,
      access_token, //github access token
    });
  } catch (error: any) {
    console.log("Error fetching data: " + error.message);
    res.status(500).json({ error: "Failed to get access token" + error });
  }
});

app.get("/getUserData", async (req, res) => {
  //receiving token from client side Authorization field.
  const token = req.cookies.access_token || req.get("Authorization");

  if (!token) {
    console.log("Token missing");
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Accept: "application/json",
        Authorization: `token ${token}`, // Ensure token is prefixed with `token`, for github auth
      },
    });

    const githubUser = response.data;
    const user = await UserModel.findOne({ gitHubUsername: githubUser.login });

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    res.json({
      _id : user._id,
      login: githubUser.login,
      name: githubUser.name,
      avatar_url: githubUser.avatar_url,
      email: githubUser.email,
      bio: githubUser.bio,
    });
  } catch (error: any) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({ message: "Error fetching data: " + error.message });
  }
});

// DATABASE CONNECTION
mongoose
  .connect(`${process.env.MONGO_URL}`)
  //const PORT = process.env.PORT || 8000;
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `App listening on port http://localhost:${process.env.PORT}/ -> db connected.`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed!!!", err);
  });
