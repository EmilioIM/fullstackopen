import express from "express";
import patientService from "../services/patientService";
// import { NewPatient } from "../types";
import { isNewPatient, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetching all patients!");
  res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  if (!isNewPatient(req.body)) {
    res.status(400).send("Invalid patient data");
  }
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientService.addEntry(newPatient);
  console.log("Added new Patient!\n", addedPatient);
  res.send(addedPatient);
});

export default router;
