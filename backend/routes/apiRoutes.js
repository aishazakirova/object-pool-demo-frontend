import express from "express";
import httpPool from "../pool/httpPool.js";

const router = express.Router();

router.get("/status", (req, res) => {
  res.json(httpPool.getStatus());
});

router.get("/fetch", async (req, res) => {
  try {
    const client = httpPool.acquire();
    const result = await client.request("https://example.com/data");
    res.json(result);
  } catch (e) {
    res.status(429).json({ error: e.message });
  }
});

export default router;

