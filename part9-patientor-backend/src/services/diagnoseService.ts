import diagnoseData from "../../data/diagnoses.ts";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnoseData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
