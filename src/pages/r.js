import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import '../form.css';
import { BsArrowRepeat, BsTrash } from 'react-icons/bs';
// @mui
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  Select as MUISelect,
  DialogActions,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { Select as Selected } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

// components
import { multipleSelectList } from '../utils/utilData';
import { MenuProps, useStyles, options as optionsData } from './utils';
import ChartComponent from './ChartComponent';
import Spinner from 'src/components/spinner/Spinner';
import { urls } from 'src/layouts/dashboard/nav/config';

const options = [
  { value: 'fullname', label: 'Name' },
  { value: 'studentLevel', label: 'Student Level' },
  { value: 'matricNum', label: 'Matric Number' },
  { value: 'registrationStatus', label: 'Registration Status' },
  { value: 'gender', label: 'Gender' },
  { value: 'maritalStatus', label: 'Marital Status' },
  { value: 'departmentID', label: 'Department' },
  { value: 'facultyID', label: 'Faculty' },
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
    { value: 'studentLevel', label: 'Student Level' },
    { value: 'departmentID', label: 'Department' },
    { value: 'facultyID', label: 'Faculty' },
  ]);
  const [user, setUser] = useState({});
  const getNeededData = async () => {
    // const user = JSON.parse(localStorage.getItem('userDetails'));
    const user = { role: roles.deans };
    console.log({ user });
    if (user.role === roles.deans) {
      setSelectConditions([
        { value: 'studentName', label: 'Name', type: 'text' },
        { value: 'yearOFEntryIntoUI', label: 'Year of Entry', type: 'select' },
        { value: 'session', label: 'Session', type: 'select' },
        { value: 'departmentID', label: 'Department', type: 'select' },
        { value: 'facultyID', label: 'Faculty', type: 'select' },
        { value: 'gender', label: 'Gender', type: 'select' },
      ]);
    } else if (user.role === roles.hod) {
      setSelectConditions([
        { value: 'studentName', label: 'Name', type: 'text' },
        { value: 'yearOFEntryIntoUI', label: 'Year of Entry', type: 'select' },
        { value: 'session', label: 'Session', type: 'select' },
        { value: 'gender', label: 'Gender', type: 'select' },
      ]);
    } else {
      setSelectConditions([
        { value: 'studentName', label: 'Name', type: 'text' },

        { value: 'yearOFEntryIntoUI', label: 'Year of Entry', type: 'select' },
        { value: 'session', label: 'Session', type: 'select' },
        { value: 'departmentID', label: 'Department', type: 'select' },
        { value: 'facultyID', label: 'Faculty', type: 'select' },
        { value: 'gender', label: 'Gender', type: 'select' },
      ]);
    }
    setUser(user);
    const response = await axios.get(`${urls}/user/initial-data`, {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    setFaculties(response.data.faculties);
    setDepartments(response.data.departments);
    setCountries(response.data.countries);
    setStates(response.data.states);
  };

  const handleGenerateChart = () => {
    setShowChartPopup(true);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChartPopup, setShowChartPopup] = useState(false);
  const [selectformData, setSelectFormData] = useState([]);
  const [selectedChart, setSelectedChart] = useState('bar');
  const [selectedCategory, setSelectedCategory] = useState('faculty');
  const [showInputText, setShowInputText] = useState(false);
  const [operator, setOperator] = useState([
    { value: '=', key: 'Equal To' },
    { value: '<', key: 'Less Than' },
    { value: '>', key: 'Greater Than' },
  ]);
  const [selectConditions, setSelectConditions] = useState(multipleSelectList);

  const [generalField, setGeneralField] = useState('studentLevel');
  const [formData, setFormData] = useState([
    {
      id: 1,
      name: '',
      category: '',
      condition: '',
      operator: false,
      showOperator: false,
      value: '',
      ascending: '',
      text: '',
      type: 'input',
      selectedValues: [],
      selected: [],
      isAllSelected: false,
    },
  ]);

  const [selected, setSelected] = useState([]);

  const handleMultipleChange = (id, event) => {
    const value = event.target.value;
    console.log({ value });
    if (value[value.length - 1] === 'all') {
      setFormData(
        formData.map((form) =>
          form.id === id
            ? {
                ...form,
                selectedValues: form.selectedValues.length === form.selected.length ? [] : form.selected,
              }
            : form
        )
      );
      return;
    }
    setFormData(formData.map((form) => (form.id === id ? { ...form, selectedValues: value ?? [] } : form)));
    setSelectedValues(value);
  };

  const handleClick = async () => {
    // setShowChartPopup(true);
    try {
      setLoading(true);
      setShowPopup(true);

      const response = await axios.post(`${urls}/user/filter`, {
        formData,
        generalField: generalField,
        selectedOptions: selectformData.length ? selectformData.map((opts) => opts.value) : ['fullname'],
      });
      console.log({ response }, response.data.flattenedResults);
      setResultData(response.data.flattenedResults);
      setChartData(response.data.actualResult);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
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
  };

  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (e) => {
    setGeneralField(e.target.value);
  };
  const handleFormSelectChange = (id, e) => {
    // Handle selected options

    let type,
      showOperator,
      value = e.target.value;
    if (value === 'studentName') {
      type = 'input';
      showOperator = false;
    } else {
      type = 'select';
      showOperator = true;
    }
    let selected = [];
    if (e.target.name === 'condition') {
      let value = e.target.value;
      if (value === 'studentName') {
        setShowInputText(true);
      } else if (value === 'session') {
        setSelected([]);
      } else if (value === 'gender') {
        selected = ['Male', 'Female'];
      } else if (value === 'departmentID') {
        selected = departments.map((d) => d.departmentName);
      } else if (value === 'facultyID') {
        console.log({ faculties });
        selected = faculties.map((d) => d.facultyName);
      }
    }
    setFormData(
      formData.map((form) =>
        form.id === id ? { ...form, [e.target.name]: e.target.value, type, showOperator, selected } : form
      )
    );
  };
  const handleOperatorChange = (id, e) => {
    setFormData(
      formData.map((form) =>
        form.id === id ? { ...form, [e.target.name]: e.target.value, operator: e.target.value } : form
      )
    );

    if (e.target.name === 'condition') {
      let value = e.target.value;
      if (value === 'studentName') {
        setShowInputText(true);
      } else {
        setShowInputText(true);
        setOperator([
          { value: '=', key: 'Equal To' },
          { value: '<', key: 'Less Than' },
          { value: '>', key: 'Greater Than' },
        ]);
      }
    }
  };

  const removeForm = (id) => {
    const newFormData = formData.filter((form) => form.id !== id);
    setFormData(newFormData);
  };

  const addNewForm = () => {
    const lastIndex = formData.length > 0 ? formData[formData.length - 1].id : 0;
    console.log({ lastIndex });
    const newFormData = {
      id: lastIndex + 1,
      name: '',
      category: '',
      condition: '',
      operator: '',
      showOperator: false,
      value: '',
      ascending: '',
      text: '',
      type: 'input',
      selected: [],
      selectedValues: [],
      isAllSelected: false,
    };
    setFormData([...formData, newFormData]);
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

  const generateChartReport = () => {};
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
            <h5>Select Conditions</h5>
            {formData.map((formDataItem) => {
              return (
                <div
                  key={formDataItem.id}
                  className="form-group middle"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <select
                    id="condition"
                    name="condition"
                    style={{ height: '40px', maxWidth: '50%' }}
                    value={formDataItem.condition}
                    onChange={(e) => {
                      setSelected([]);
                      handleFormSelectChange(formDataItem.id, e);
                    }}
                    required
                  >
                    <option value="">Select conditions</option>
                    {selectConditions.map((c) => (
                      <option value={c.value}>{c.label}</option>
                    ))}
                  </select>

                  {/* {formDataItem.showOperator && (
                    <select
                      style={{ height: '40px', maxWidth: '50%' }}
                      id="operator"
                      name="operator"
                      value={formData.operator}
                      onChange={(e) => handleOperatorChange(formDataItem.id, e)}
                      required
                    >
                      <option value="">Operator</option>
                      {operator.map((item, index) => (
                        <option value={item.value}>{item.key}</option>
                      ))}
                    </select>
                  )} */}
                  <div>
                    {formDataItem.type === 'select' ? (
                      <FormControl className={classes.formControl} style={{ marginTop: '-10px', minWidth: '100%' }}>
                        <InputLabel id="mutiple-select-label">Multiple Select</InputLabel>
                        <Selected
                          labelId="mutiple-select-label"
                          multiple
                          value={formDataItem.selectedValues}
                          onChange={(e) => handleMultipleChange(formDataItem.id, e)}
                          renderValue={(selectedValues) => selectedValues.join(', ')}
                          MenuProps={MenuProps}
                        >
                          <MenuItem
                            value="all"
                            classes={{
                              root: formDataItem.isAllSelected ? classes.selectedAll : '',
                            }}
                          >
                            <ListItemIcon>
                              <Checkbox
                                classes={{ indeterminate: classes.indeterminateColor }}
                                checked={formDataItem.isAllSelected}
                                indeterminate={
                                  formDataItem.selectedValues.length > 0 &&
                                  formDataItem.selectedValues.length < formDataItem.selected.length
                                }
                              />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.selectAllText }} primary="Select All" />
                          </MenuItem>
                          {formDataItem.selected.map((option, id) => (
                            <MenuItem key={id} value={option}>
                              <ListItemIcon>
                                <Checkbox checked={formDataItem.selectedValues.indexOf(option) > -1} />
                              </ListItemIcon>
                              <ListItemText primary={option} />
                            </MenuItem>
                          ))}
                        </Selected>
                      </FormControl>
                    ) : (
                      <div style={{ minWidth: '100%' }}>
                        <input
                          type="text"
                          id="text"
                          // style={{ width: '50%' }}
                          style={{ height: '40px', minWidth: '200px' }}
                          name="text"
                          value={formDataItem.text}
                          onChange={(e) => {
                            const newFormData = formData.map((form) => {
                              if (form.id === formDataItem.id) {
                                return { ...form, text: e.target.value };
                              } else {
                                return form;
                              }
                            });
                            console.log({ newFormData });
                            setFormData(newFormData);
                          }}
                          required
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <Button onClick={() => removeForm(formDataItem.id)}>
                      <BsTrash />
                    </Button>
                  </div>
                </div>
              );
            })}
            <Button onClick={addNewForm}>Add new Form </Button>
            <div className="line" />
            <div className="form-group">
              <label htmlFor="message">Sort Fields</label>
              <select id="field" name="generalField" value={generalField} onChange={handleChange} required>
                <option value="">Select Fields</option>
                {bottomRow.map((item, index) => (
                  <option value={item.value}>{item.label}</option>
                ))}
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
                  <div>
                    <Spinner />
                  </div>
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
                        chartData={chartData}
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
