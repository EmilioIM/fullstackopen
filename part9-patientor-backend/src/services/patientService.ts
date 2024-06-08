import patientsData from "../../data/patients.ts";
import { Patient, NonSensitivePatient, NewPatient, Gender } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData.map((patient) => ({
  ...patient,
  gender: patient.gender as Gender, // Asegura que gender sea del tipo Gender
}));

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

const addEntry = (newPatient: NewPatient): NewPatient => {
  const newPatientEntry = {
    id: uuid(),
    ...newPatient,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};
