import data from '../mocks/patientsMock.json' with { type: 'json' };
export const fetchPatients = async (studentId) => {
  if (studentId) {
    return data;
  }
  throw new Error('Student ID is required');
};
console.log(fetchPatients());
