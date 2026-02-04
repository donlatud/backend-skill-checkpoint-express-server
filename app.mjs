import express from "express";
import "dotenv/config";
import questionRoutes from "./routes/question.routes.mjs";
import answerRoutes from "./routes/answer.routes.mjs";

const app = express();
const port = 4000;

app.use(express.json());
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
