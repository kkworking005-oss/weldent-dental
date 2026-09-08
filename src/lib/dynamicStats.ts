const EXPERIENCE_START_YEAR = 2023;
const SMILES_BASE_YEAR = 2023;
const SMILES_PER_YEAR = 500;

export function getYearsOfExperience(): number {
  return new Date().getFullYear() - EXPERIENCE_START_YEAR;
}

export function getSmilesTreated(): number {
  return SMILES_PER_YEAR * (new Date().getFullYear() - SMILES_BASE_YEAR + 1);
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
