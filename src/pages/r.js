import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import '../form.css';
import { BsArrowRepeat } from 'react-icons/bs';
// @mui
import { Grid, Button, Container, Stack, Typography, Select as MUISelect, DialogActions } from '@mui/material';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Select as Selected } from '@material-ui/core';

// components
import { lookupTable, gender, sessions, multipleSelectList } from '../utils/utilData';
import { MenuProps, useStyles, options as optionsData } from './utils';
import ChartComponent from './ChartComponent';

const options = [
  { value: 'studentFirstName', label: 'First name' },
  { value: 'studentLastSurname', label: 'Last name' },
  { value: 'studentMatricNum', label: 'Matric Number' },
  { value: 'studyLevel', label: 'Level' },
  { value: 'gender', label: 'Gender' },
  { value: 'faculty_id', label: 'Faculty' },
  { value: 'department_id', label: 'Department' },
  { value: 'email', label: 'email' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const classes = useStyles();
  useEffect(() => {
    getNeededData();
  }, []);

  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [bottomRow, setBottomRow] = useState([
    { value: 'studyLevel', label: 'Study Level' },
    { value: 'department_id', label: 'department' },
    { value: 'faculty_id', label: 'faculty' },
  ]);
  const [user, setUser] = useState({});
  const getNeededData = async () => {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    console.log({ user });
    if (user.role === roles.deans) {
      setSelectConditions([
        { value: 'studentFirstName', label: 'First name', type: 'text' },
        { value: 'studentMiddleName', label: 'Middle name', type: 'text' },
        { value: 'studentLastSurname', label: 'Last name', type: 'text' },
        { value: 'yearOFEntryIntoUI', label: 'Year of Entry', type: 'select' },
        { value: 'session', label: 'Session', type: 'select' },
        { value: 'departmentID', label: 'Department', type: 'select' },
        { value: 'gender', label: 'Gender', type: 'select' },
      ]);
    } else if (user.role === roles.hod) {
      setSelectConditions([
        { value: 'studentFirstName', label: 'First name', type: 'text' },
        { value: 'studentMiddleName', label: 'Middle name', type: 'text' },
        { value: 'studentLastSurname', label: 'Last name', type: 'text' },
        { value: 'yearOFEntryIntoUI', label: 'Year of Entry', type: 'select' },
        { value: 'session', label: 'Session', type: 'select' },
        { value: 'gender', label: 'Gender', type: 'select' },
      ]);
    }
    setUser(user);
    console.log({ user }, 'jjjdjdj');
    const response = await axios.get(`http://localhost:5000/api/student/query/initial`, {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    console.log({ response });
    setFaculties(response.data.faculty);
    setDepartments(response.data.departments);
    setCountries(response.data.countries);
    setStates(response.data.states);
  };

  const handleGenerateChart = () => {
    setShowChartPopup(true);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChartPopup, setShowChartPopup] = useState(false);
  const [selectformData, setSelectFormData] = useState();
  const [selectedChart, setSelectedChart] = useState('bar');
  const [selectedCategory, setSelectedCategory] = useState('faculty');
  const [conditionData, setConditionData] = useState([]);
  const [showInputText, setShowInputText] = useState(false);
  const [operator, setOperator] = useState([]);
  const [selectConditions, setSelectConditions] = useState(multipleSelectList);
  const [showOperator, setSHowOperator] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: '',
    operator: '',
    value: '',
    field: 'studyLevel',
    ascending: '',
    text: '',
  });

  const [selected, setSelected] = useState([]);
  const isAllSelected = conditionData.length > 0 && selected.length === conditionData.length;

  const handleMultipleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === 'all') {
      setSelected(selected.length === conditionData.length ? [] : conditionData.map((c) => c.value));
      return;
    }
    setSelected(value);
  };

  const handleClick = async () => {
    // setShowChartPopup(true);
    try {
      setLoading(true);
      setShowPopup(true);
      console.log({ formData });
      const selectedData = selectformData;
      console.log({ selectedData });
      if (!selectedData.find((data) => data.value === formData.field) && formData.field !== '') {
        selectedData.push({ value: formData.field });
      }
      const requestObject = selectedData.map((data) => `${data.value}`);
      const table = lookupTable[formData.condition].name;
      const columns = lookupTable[formData.condition].common;
      console.log({ selectedData, selectformData, requestObject, table, columns, selected });
      // try {
      console.log({ user });
      const bodyData = {
        selectedFields: requestObject,
        selectionType: columns,
        selections: selected,
        userRole: user.role,
        facultyName: user.accessLevel ?? '',
        departmentName: user.accessLevel ?? '',
      };
      console.log({ bodyData });
      const response = await axios.post(`http://localhost:5000/api/student/get/table`, bodyData);
      setResultData(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    // } catch (e) {
    //   console.log({ e });
    // }
  };

  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleChartSelect = (e) => {
    setSelectedChart(e.target.value);
  };
  const roles = {
    superrole: 'Superrole',
    principal: 'Principal',
    director: 'Director',
    deans: 'Deans',
    hod: 'HOD',
  };
  const handleSelectChange = (selectedOptions) => {
    // Handle selected options
    setSelectFormData(selectedOptions);
    console.log(selectedOptions);
  };
  const handleChange = (e) => {
    // Handle selected options
    const dataValue = {
      departmentID: departments,
      faculty: faculties,
      gender,
      session: sessions,
    };
    console.log(e.target.value, e.target.name, faculties);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'condition') {
      let value = e.target.value;
      if (value === 'studentLastSurname' || value === 'studentFirstName' || value === 'studentMiddleName') {
        setShowInputText(true);
        setSHowOperator(false);
      } else if (value === 'session') {
        setSHowOperator(true);
        setShowInputText(true);
        setOperator([
          { value: '=', key: 'Equal To' },
          { value: '<', key: 'Less Than' },
          { value: '>', key: 'Greater Than' },
        ]);
      } else {
        setShowInputText(false);
        console.log(dataValue[e.target.value]);
        setConditionData(dataValue[e.target.value]);
      }
    }
  };

  // const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };
  console.log({ optionsData });
  return (
    <>
      <Helmet>
        <title> Dashboard: Reporting | Minimal UI </title>
      </Helmet>

      <Container>
        <div className={`form-container ${showPopup ? 'opacity-reduced' : ''}`}>
          {/* <h2>Contact Form</h2> */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Report Generation
            </Typography>
            <Typography variant="h5" gutterBottom>
              AccessLevel : {user.role}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {user.role === roles.deans ? 'Faculty' : user.role === roles.hod ? 'Department' : 'Access'}:{' '}
              {user.role === roles.deans ? user.accessLevel : user.role === roles.hod ? user.accessLevel : 'All'}
            </Typography>
          </Stack>

          <div onSubmit={handleSubmit}>
            <div className=" multiselect">
              <label htmlFor="name">Report Fields</label>
              <Select
                isMulti
                id="name"
                options={options}
                className="multi-select"
                classNamePrefix="select"
                placeholder="Select students to display"
                onChange={handleSelectChange}
                styles={{
                  width: '100%',
                  control: (provided) => ({
                    ...provided,
                    fontSize: '14px',
                    color: 'hsl(0, 0%, 20%)',
                  }),
                }}
              />
            </div>
            <div className="line" />
            <div className="form-group middle">
              <label htmlFor="email">Field Conditions</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={(e) => {
                  setSelected([]);
                  handleChange(e);
                }}
                required
              >
                <option value="">Select conditions</option>
                {selectConditions.map((c) => (
                  <option value={c.value}>{c.label}</option>
                ))}
              </select>

              {showOperator && (
                <select id="operator" name="operator" value={formData.operator} onChange={handleChange} required>
                  <option value="">Operator</option>
                  {operator.map((item, index) => (
                    <option value={item.value}>{item.key}</option>
                  ))}
                </select>
              )}
              {!showInputText ? (
                <FormControl className={classes.formControl}>
                  <InputLabel id="mutiple-select-label">Multiple Select</InputLabel>
                  <Selected
                    labelId="mutiple-select-label"
                    multiple
                    value={selected.map((item) => item)}
                    onChange={handleMultipleChange}
                    renderValue={(selected) => selected.map((item) => item).join(', ')}
                    MenuProps={MenuProps}
                  >
                    <MenuItem
                      value="all"
                      classes={{
                        root: isAllSelected ? classes.selectedAll : '',
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          classes={{ indeterminate: classes.indeterminateColor }}
                          checked={isAllSelected}
                          indeterminate={selected.length > 0 && selected.length < options.length}
                        />
                      </ListItemIcon>
                      <ListItemText classes={{ primary: classes.selectAllText }} primary="Select All" />
                    </MenuItem>
                    {conditionData.map((option, index) => {
                      return (
                        <MenuItem key={index} value={option.name}>
                          <ListItemIcon>
                            <Checkbox checked={selected.indexOf(option.name) > -1} />
                          </ListItemIcon>
                          <ListItemText primary={option.name} />
                        </MenuItem>
                      );
                    })}
                  </Selected>
                </FormControl>
              ) : (
                <input
                  type="text"
                  id="text"
                  style={{ width: '50%' }}
                  name="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  required
                />
              )}
            </div>
            <div className="line" />
            <div className="form-group">
              <label htmlFor="message">Sort Fields</label>
              <select id="field" name="field" value={formData.field} onChange={handleChange} required>
                <option value="">Select Fields</option>
                {bottomRow.map((item, index) => (
                  <option value={item.value}>{item.label}</option>
                ))}
              </select>

              <select id="ascending" name="ascending" value={formData.message} onChange={handleChange} required>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
            </div>
            <div className="line" />
            <div className="submit-btn">
              <button type="submit" onClick={handleClick}>
                <BsArrowRepeat size={20} style={{ marginRight: '8px' }} />
                <span className="button-text">Generate Report</span>
              </button>
            </div>
            {showPopup && (
              <div className="popup">
                {loading ? (
                  <div>spinner</div>
                ) : resultData && resultData?.length > 0 ? (
                  <div className="report-container">
                    <h2>Report</h2>
                    <div className="table-container">
                      <Stack flexDirection="row" gap="20px">
                        <h2>Total Students:</h2>
                        <p style={{ fontSize: '22px' }}>{resultData.length} students</p>
                      </Stack>

                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            {Object.keys(resultData[0]).map((item, index) => {
                              return <th key={index}>{item}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {resultData.map((row, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                {Object.keys(row).map((key, rowIndex) => {
                                  return <td key={rowIndex}>{row[key]}</td>;
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="report-container">
                    <h2>Report</h2>
                    <div className="table-container">
                      <h1>No Data found</h1>
                    </div>
                    <div className="submit-btn">
                      <button className="close-button" onClick={() => setShowPopup(false)}>
                        Close
                      </button>
                    </div>
                  </div>
                )}
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <DialogActions>
                    <Button
                      sx={{ color: 'red', width: '250px' }}
                      className="close-button"
                      variant="filled"
                      onClick={handleGenerateChart}
                    >
                      <BsArrowRepeat size={20} style={{ marginRight: '8px' }} /> Generate Charts{' '}
                    </Button>
                  </DialogActions>
                  <DialogActions>
                    <Button
                      sx={{ color: 'red', width: '150px' }}
                      className="close-button"
                      variant="filled"
                      onClick={() => setShowPopup(false)}
                    >
                      {' '}
                      Close{' '}
                    </Button>
                  </DialogActions>
                          
                </Stack>
              </div>
            )}

            {showChartPopup && (
              <div className="popup">
                <div className="report-container">
                  <div className="chart-content">
                    <div className="chart-selection">
                      <select
                        id="field"
                        name="field"
                        className="chart-select"
                        value={selectedChart}
                        onChange={handleChartSelect}
                        required
                      >
                        {/* <option value="">Select Chart</option> */}
                        <option value="bar">Bar Chart</option>
                        <option value="area">Area Chart</option>
                        <option value="line">Line Chart</option>
                      </select>
                    </div>

                    <div>
                      <ChartComponent
                        xAxis={formData.field}
                        data={resultData}
                        selectedChart={selectedChart}
                        selectedCategory={selectedCategory}
                      />
                    </div>
                  </div>
                  <div className="chart-submit-btn">
                    <button className="close-button" onClick={() => setShowChartPopup(false)}>
                      Close
                    </button>
                  </div>
                </div>

                <div className="submit-btn">
                  <button className="close-button" onClick={() => setShowChartPopup(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
