/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from "express";
import routers from "./app/routers";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import { environment } from "apps/authenticated/src/environments/environment";
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(routers);

const port = process.env.port || 3333;
const server = app.listen(port, async () => {
  console.log(`mongodb+srv://${environment.dbUsername}:${environment.dbPassword}@${environment.dbCluster}.mongodb.net/${environment.dbName}?retryWrites=true&w=majority`)
  await mongoose.connect(
    `mongodb+srv://${environment.dbUsername}:${environment.dbPassword}@${environment.dbCluster}.mongodb.net/${environment.dbName}?retryWrites=true&w=majority`
  );
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
