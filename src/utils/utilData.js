export const gender = [
  {
    id: 'M',
    value: 'M',
    name: 'male',
  },
  {
    id: 'F',
    value: 'F',
    name: 'female',
  },
];
export const sessions = [
  {
    id: 1,
    value: '2022/2023',
    name: '2022/2023',
  },
  {
    id: 2,
    value: '2023/2024',
    name: '2023/2024',
  },
  {
    id: 3,
    value: '2024/2025',
    name: '2024/2025',
  },
  {
    id: 4,
    value: '2025/2026',
    name: '2025/2026',
  },
  {
    id: 5,
    value: '2026/2027',
    name: '2026/2027',
  },
  {
    id: 6,
    value: '2027/2028',
    name: '2027/2028',
  },
  {
    id: 7,
    value: '2028/2029',
    name: '2028/2029',
  },
  {
    id: 8,
    value: '2029/2030',
    name: '2029/2030',
  },
  {
    id: 9,
    value: '2030/2031',
    name: '2030/2031',
  },
  {
    id: 10,
    value: '2031/2032',
    name: '2031/2032',
  },
];

export const multipleSelectList = [
  { value: 'studentFirstName', label: 'First name', type: 'text' },
  { value: 'studentMiddleName', label: 'Middle name', type: 'text' },
  { value: 'studentLastSurname', label: 'Last name', type: 'text' },
  { value: 'yearOFEntryIntoUI', label: 'Year of Entry', type: 'select' },
  { value: 'session', label: 'Session', type: 'select' },
  { value: 'faculty', label: 'Faculty', type: 'select' },
  { value: 'departmentID', label: 'Department', type: 'select' },
  { value: 'gender', label: 'Gender', type: 'select' },
];

export const lookupTable = {
  departmentID: {
    name: 'department_odd',
    common: 'departmentName',
    seperateTable: true,
  },
  faculty: { name: 'faculty', common: 'facultyName', seperateTable: true },
  gender: { name: 'gender', common: 'gender', seperateTable: false },
  session: { name: 'session', common: 'currentSession', seperateTable: false },
};
