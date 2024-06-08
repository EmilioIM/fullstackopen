import { Gender, NewPatient } from "./types";

export const isNewPatient = (object: any): object is NewPatient => {
  return (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  );
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    throw new Error("Provided data is not an object");
  }

  const asObject = object as { [key: string]: unknown };
  const requiredFields = ["name", "dateOfBirth", "ssn", "gender", "occupation"];

  for (const field of requiredFields) {
    if (!asObject[field] || typeof asObject[field] !== "string") {
      throw new Error(`Missing or invalid ${field}`);
    }
  }

  const newPatient: NewPatient = {
    name: asObject.name as string,
    dateOfBirth: asObject.dateOfBirth as string,
    ssn: asObject.ssn as string,
    gender: asObject.gender as Gender,
    occupation: asObject.occupation as string,
  };

  return newPatient;
};
