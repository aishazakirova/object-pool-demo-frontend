import express from "express";
import apiRoutes from "./routes/apiRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use("/api", apiRoutes);

app.listen(3002, () => console.log("🚀 Object Pool server running on port 3002"));

app.get("/api/init", (req, res) => {
    const size = Number(req.query.size || 3);
    httpPool = new ObjectPool(size);
    res.json({ message: `Pool resized to ${size}` });
  });
  