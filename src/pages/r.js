import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import '../form.css';
import { BsArrowRepeat } from 'react-icons/bs';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
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
// mock
import POSTS from '../_mock/blog';
// import { Charts } from '../layouts/charts/Charts';
import ChartComponent from './ChartComponent';
import { urls } from 'src/layouts/dashboard/nav/config';

const options = [
  { value: 'studentFirstName', label: 'First name' },
  { value: 'studentLastSurname', label: 'Last name' },
  { value: 'studentMatricNum', label: 'Matric Number' },
  { value: 'studyLevel', label: 'Level' },
  { value: 'gender', label: 'Gender' },
  { value: 'faculty', label: 'Faculty' },
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
  const getNeededData = async () => {
    const response = await axios.get(`http://localhost:5000/api/student/query/initial`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('userDetails')).token}`,
      },
    });
    console.log({ response });
    setFaculties(response.data.faculty);
    setDepartments(response.data.departments);
    setCountries(response.data.countries);
    setStates(response.data.states);
  };
  const retrieveData = async (queryData) => {
    console.log({ queryData });
    try {
      const response = await axios.get(`http://localhost:5000/api/student/get/table`, {
        params: {
          // tableName,
          // columns,
          // conditions,
          queryData,
        },
      });
      console.log({ response });
      return response.data.results;
    } catch (e) {
      console.log(e);
    }
  };
  const handleGenerateChart = () => {
    setShowChartPopup(true);
    // setFilteredData(filteredData);
    // setShowPopup
    // Perform any desired action with the filteredData
    // console.log(filteredData);
    // You can generate the report or perform any other operations here
  };

  const [showPopup, setShowPopup] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChartPopup, setShowChartPopup] = useState(false);
  const [selectedChart, setSelectedChart] = useState(false);
  const [selectformData, setSelectFormData] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [conditionData, setConditionData] = useState([]);
  const [showInputText, setShowInputText] = useState(false);
  const [operator, setOperator] = useState([]);
  const [showOperator, setSHowOperator] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: '',
    operator: '',
    value: '',
    field: '',
    ascending: '',
    text: '',
  });

  const [selected, setSelected] = useState([]);
  const isAllSelected = conditionData.length > 0 && selected.length === conditionData.length;

  const handleMultipleChange = (event) => {
    const value = event.target.value;
    console.log({ value, conditionData });
    if (value[value.length - 1] === 'all') {
      setSelected(selected.length === conditionData.length ? [] : conditionData.map((c) => c.value));
      return;
    }
    setSelected(value);
  };

  const handleClick = async () => {
    // setShowChartPopup(true);
    // try {
    setLoading(true);
    setShowPopup(true);
    console.log({ formData });
    let queryData;
    const selectedData = selectformData;
    if (!selectedData.find((data) => data.value === formData.field) && formData.field !== '') {
      selectedData.push({ value: formData.field });
    }
    console.log({ selectedData, selectformData });

    if (!showInputText) {
      if (formData.condition !== '') {
        const table = lookupTable[formData.condition].name;
        const columns = lookupTable[formData.condition].common;
        const seperateTable = lookupTable[formData.condition].seperateTable;
        console.log({ table, columns });
        const requestObject = selectedData.map((data) => `s.${data.value}`);
        console.log({ requestObject });

        if (seperateTable) {
          queryData = `SELECT ${requestObject.join(', ')} FROM student s JOIN ${table} d ON s.${
            formData.condition
          } = d.${formData.condition === 'faculty' ? 'facultyID' : formData.condition} WHERE d.${columns} IN (${selected
            .map((d) => `'${d}'`)
            .join(', ')})`;
          console.log({ queryData });
        } else if (formData.condition === 'gender' || formData.condition === 'currentSession') {
          queryData = `SELECT ${requestObject.join(', ')} FROM student s WHERE ${columns} IN (${selected
            .map((d) => `'${d}'`)
            .join(', ')})`;
        } else {
          const requestObject = selectedData.map((data) => `${data.value}`);
          queryData = `SELECT  ${requestObject.join(', ')} FROM student WHERE ${columns} = '${formData.value}'`;
        }
      } else {
        const requestObject = selectedData.map((data) => data.value);
        queryData = `SELECT  ${requestObject.join(', ')} FROM student`;
      }
    } else {
      const requestObject = selectedData.map((data) => data.value);
      queryData = `SELECT  ${requestObject.join(', ')} FROM student WHERE ${formData.condition} = '${formData.text}'`;
    }
    console.log({ queryData });
    let data = await retrieveData(queryData);
    setResultData(data);
    setLoading(false);
    // } catch (e) {
    //   console.log({ e });
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleChartSelect = (e) => {
    setSelectedChart(e.target.value);
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
                  control: (provided) => ({
                    ...provided,
                    fontSize: '14px',
                    color: 'hsl(0, 0%, 20%)', // Adjust the font size here
                  }),
                }}
              />
            </div>
            <div className="line" />
            <div className="form-group middle">
              <label htmlFor="email">Field Conditions</label>
              <select id="condition" name="condition" value={formData.condition} onChange={handleChange} required>
                <option value="">Select conditions</option>
                {multipleSelectList.map((c) => (
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
                      console.log(option);
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
                <option value="studentMatricNum">Matric Number</option>
                <option value="currentSession">session</option>
                <option value="studyLevel">Study Level</option>
                <option value="departmentID">department</option>
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
                ) : resultData.length > 0 ? (
                  <div className="report-container">
                    <h2>Report</h2>
                    <div className="table-container">
                      <table className="table">
                        <thead>
                          <tr>
                            {Object.keys(resultData[0]).map((item, index) => {
                              return <th key={index}>{item}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {resultData.map((row, index) => {
                            return (
                              <tr key={index}>
                                {
                                  //  const keys =
                                  Object.keys(row).map((key) => {
                                    return <td>{row[key]}</td>;
                                  })
                                }
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="submit-btn">
                      <button type="submit" className="close-button" style={{ marginRight: '8px' }}>
                        <BsArrowRepeat size={20} style={{ marginRight: '8px' }} />
                        <span className="button-text" onClick={handleGenerateChart}>
                          Generate Charts
                        </span>
                      </button>

                      {/* <Link to="/chart" style={{ textDecoration: "none" }}>
                          <button type="submit" onClick={handleClick} className='close-button' style={{ marginRight: '8px' }}>
                                <BsArrowRepeat size={20} style={{ marginRight: '8px' }}/>
                                <span className="button-text" onClick={handleGenerateChart}>Generate Charts</span>
                          </button>
                        </Link> */}
                      <button className="close-button" onClick={() => setShowPopup(false)}>
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '40px 0',
                    }}
                  >
                    no data found
                  </div>
                )}
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
                        className="faculty-select"
                        value={selectedCategory}
                        onChange={handleSelectedCategory}
                        required
                      >
                        {/* <option value="">Select Chart</option> */}
                        <option value="bar">Faculty</option>
                        <option value="area">Department</option>
                        <option value="line">Programme</option>
                        {/* <option value="radar">Radar Chart</option>
                              <option value="scatter">Scatter Chart</option>
                              <option value="heatmap">Heatmap Chart</option> */}
                      </select>

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
                        <option value="radar">Radar Chart</option>
                        <option value="scatter">Scatter Chart</option>
                        <option value="heatmap">Heatmap Chart</option>
                      </select>
                    </div>

                    <div>
                      <ChartComponent xAxis={formData.field} data={resultData} />
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
