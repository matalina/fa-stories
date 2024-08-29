import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import ViteExpress from "vite-express";

dotenv.config();

const app = express();

app.get("/message", (_, res) => res.send("Hello from express!"));
app.get('/api/characters', getCharacters);
app.get('/api/character-story/:id', getCharacterStory);
app.get('/api/posts/:topicId', getTopicPosts);

ViteExpress.listen(app, 3000, () => console.log("Server is listening on Port 3000..."));

export class User {
  uid;
}

export class Forum {
  fid;
}

export class Topic {
  tid;
}

export class Post {
  pid;
}

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYBB_HOST,
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  username: process.env.MYBB_USERNAME,
  password: process.env.MYBB_PASSWORD,
  database: process.env.MYBB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Forum, Topic, Post],
  migrations: [],
  subscribers: [],
})

await AppDataSource.initialize();

async function getCharacters(req, res) {
  const user = await AppDataSource.manager.find(User);
  console.log(user);
  const data = {};
  res.json(data);
}

async function getCharacterStory(req, res) {
  const data = {};
  res.json(data);
}

async function getTopicPosts(req, res) {
  const data = {};
  res.json(data);
}
