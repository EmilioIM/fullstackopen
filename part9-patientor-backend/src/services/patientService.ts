import patientsData from "../../data/patients.ts";
import { Patient, NonSensitivePatient } from "../types/patient.ts";

const patient: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patient.map(({ ssn, ...rest }) => rest);
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};
