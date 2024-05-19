import diagnoseData from '../../data/diagnoses.ts';
import Diagnose from '../types/diagnose.ts';

const diagnoses: Diagnose[] = diagnoseData;

const getEntries = ():Diagnose[] => {
  return diagnoses;
}

const addEntry = () => {
  return null;
}

export default {
  getEntries,
  addEntry
};