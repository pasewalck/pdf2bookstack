import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api";
import env from "./helpers/env";

const app = express();
const port = env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
