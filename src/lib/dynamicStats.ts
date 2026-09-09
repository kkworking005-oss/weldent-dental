const EXPERIENCE_START_YEAR = 2023;
const SMILES_BASE_YEAR = 2023;
const SMILES_AT_START = 500;
const ADDITIONAL_SMILES_PER_YEAR = 500;

export function getYearsOfExperience(currentYear = new Date().getFullYear()): number {
  return currentYear - EXPERIENCE_START_YEAR;
}

export function getSmilesTreated(currentYear = new Date().getFullYear()): number {
  return SMILES_AT_START + (currentYear - SMILES_BASE_YEAR) * ADDITIONAL_SMILES_PER_YEAR;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
