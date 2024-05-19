import express from "express";
import diagnosesService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetching all diagnoses!");
  res.send(diagnosesService.getEntries());
});

export default router;
