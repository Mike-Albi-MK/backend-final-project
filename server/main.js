import express from "express";
import cors from "cors";
import "dotenv/config";

import connectToDB from "./libs/db.js";

await connectToDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express());
app.use(cors());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));