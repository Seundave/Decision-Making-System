import React, { useState } from 'react';

function FacultyDepartmentDropdown({ departments, faculties, selectedDepartment, setSelectedDepartment }) {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  //   const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isFacultyOpen, setIsFacultyOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedDepartment(null); // Reset the selected department when faculty changes
    filterDepartmentsByFaculty(faculty.id);
    setIsFacultyOpen(false);
    setIsDepartmentOpen(true); // Open the department dropdown
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setIsDepartmentOpen(false);
  };

  const filterDepartmentsByFaculty = (facultyID) => {
    const filtered = departments.filter((dept) => dept.facultyID === facultyID);
    setFilteredDepartments(filtered);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div>
        <label>Faculty:</label>
        <div style={{ zIndex: '99999' }} className={`custom-select-dropdown ${isFacultyOpen ? 'open' : ''}`}>
          <div className="selected-option" onClick={() => setIsFacultyOpen(!isFacultyOpen)}>
            {selectedFaculty ? selectedFaculty.name : 'Select a Faculty'}
          </div>
          {isFacultyOpen && (
            <div className="options">
              {faculties.map((faculty) => (
                <div key={faculty.id} className="option" onClick={() => handleFacultySelect(faculty)}>
                  {faculty.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label>Department:</label>
        <div style={{ zIndex: '99999' }} className={`custom-select-dropdown ${isDepartmentOpen ? 'open' : ''}`}>
          <div className="selected-option" onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}>
            {selectedDepartment ? selectedDepartment.name : 'Select a Department'}
          </div>
          {isDepartmentOpen && (
            <div className="options">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredDepartments.map((department) => (
                <div key={department.id} className="option" onClick={() => handleDepartmentSelect(department)}>
                  {department.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyDepartmentDropdown;
