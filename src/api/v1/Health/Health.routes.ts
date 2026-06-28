import { Router } from "express";
const route = Router();

route.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

export { route as HealthRoutes };
