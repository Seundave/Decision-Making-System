// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Select from 'react-select';
// import { Helmet } from 'react-helmet-async';
// import '../form.css';
// import { BsArrowRepeat } from 'react-icons/bs';
// import { departments, faculties, lookupTable, gender, sessions } from '../utils/utilData';
// // import {Charts} from '../layouts/charts/Charts'
// // import {ChartGeneration} from '../layouts/charts/Charts'
// // @mui
// import {
//   Grid,
//   Button,
//   Container,
//   Stack,
//   Typography,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogActions,
// } from '@mui/material';
// // components
// // import Iconify from '../components/iconify';
// // import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// // mock
// // import POSTS from '../_mock/blog';
// import { Charts } from '../layouts/charts/Charts';
// import profileImage1 from '../asset/seundave.jpg';
// import profileImage2 from '../asset/university.png';
// import profileImage3 from '../asset/seundave1.jpg';

// // ----------------------------------------------------------------------

// // const SORT_OPTIONS = [
// //   { value: 'latest', label: 'Latest' },
// //   { value: 'popular', label: 'Popular' },
// //   { value: 'oldest', label: 'Oldest' },
// // ];

// const image1 = profileImage1;
// const image2 = profileImage2;
// const image3 = profileImage3;

// const options = [
//   { value: 'FirstName', label: 'First name' },
//   { value: 'SecondName', label: 'Second name' },
//   { value: 'Department', label: 'Department' },
//   { value: 'Level', label: 'Level' },
//   { value: 'Gender', label: 'Gender' },
//   { value: 'Faculty', label: 'Faculty' },
// ];

// const tableData = [
//   {
//     id: 1,
//     firstName: 'John',
//     middleName: 'Ayo',
//     lastName: 'Doe',
//     image: image1,
//     gender: 'Male',
//     faculty: 'Technology',
//     departmentID: '123456',
//     email: 'Ayo@gmail.com',
//     dateOfBirth: '02-03-1998',
//     nationality: 'Nigeria',
//     yearOfEntryIntoUI: '2015',
//     modeOfEntry: 'Pre-degree',
//     stateOfOrigin: 'Osun',
//     Lga: 'Osun East',
//     homeTown: 'Osogbo',
//     permanentAddress: 'No 14, Akala Way',
//     studyStatus: 'Active',
//     studyLevel: '500',
//     presentProgrammeEntryYear: '2015',
//     MatricNum: 'NYC/2015/3567',
//     jambRegNumber: '563738929292',
//     maritalStatus: 'Single',
//   },
//   {
//     id: 2,
//     firstName: 'Jane',
//     middleName: 'Flourence',
//     lastName: 'Smith',
//     image: image2,
//     gender: 'Female',
//     faculty: 'Science',
//     departmentID: '78956',
//     email: 'Smith@gmail.com',
//     dateOfBirth: '04-06-1999',
//     nationality: 'Canada',
//     yearOfEntryIntoUI: '2016',
//     modeOfEntry: 'JAMB',
//     stateOfOrigin: 'Ogun',
//     Lga: 'Ogun South',
//     homeTown: 'Sagamu',
//     permanentAddress: 'No 12, Providence Arena',
//     studyStatus: 'Inactive',
//     studyLevel: '400',
//     presentProgrammeEntryYear: '2013',
//     MatricNum: 'NYC/2013/4567',
//     jambRegNumber: '282929292922',
//     maritalStatus: 'Married',
//   },
//   {
//     id: 3,
//     firstName: 'Bob',
//     middleName: 'Babatunde',
//     lastName: 'Johnson',
//     image: image3,
//     gender: 'Male',
//     faculty: 'Arts',
//     departmentID: '346789',
//     email: 'Johnson@gmail.com',
//     dateOfBirth: '06-03-2000',
//     nationality: 'USA',
//     yearOfEntryIntoUI: '2019',
//     modeOfEntry: 'JAMB',
//     stateOfOrigin: 'Lagos',
//     Lga: 'Lagos West',
//     homeTown: 'Oshodi',
//     permanentAddress: 'No 16, Olonfi Way',
//     studyStatus: 'Active',
//     studyLevel: '200',
//     presentProgrammeEntryYear: '2014',
//     MatricNum: 'NYC/2014/3421',
//     jambRegNumber: '90484746372822',
//     maritalStatus: 'Single',
//   },
// ];
// // ----------------------------------------------------------------------

// export default function ReportingPage() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [showDetailsPopup, setShowDetailsPopup] = useState(false);
//   const [showChartPopup, setShowChartPopup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [studentIndex, setStudentIndex] = useState(null);
//   const [selectedChart, setSelectedChart] = useState('bar');
//   const [selectedCategory, setSelectedCategory] = useState('faculty');
//   // const [filteredData, setFilteredData] = useState([]);
//   // const [selectedOptions, setSelectedOptions] = useState([]);
//   const [resultData, setResultData] = useState([]);
//   const [selectformData, setSelectFormData] = useState();
//   const [conditionData, setConditionData] = useState([]);
//   const [showInputText, setShowInputText] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     condition: '',
//     operator: '',
//     value: '',
//     field: '',
//     ascending: '',
//     text: '',
//   });

//   const retrieveData = async (queryData) => {
//     console.log({ queryData });
//     try {
//       const response = await axios.get(`${urls}/api/student/get/table`, {
//         params: {
//           // tableName,
//           // columns,
//           // conditions,
//           queryData,
//         },
//       });
//       console.log({ response });
//       return response.data.results;
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handleChartSelect = (event) => {
//     console.log(event.target.value);
//     setSelectedChart(event.target.value);
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 300);
//   };

//   const handleSelectedCategory = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   // const handleChange = (e) => {
//   //   setFormData({ ...formData, [e.target.name]: e.target.value });
//   //   console.log(formData);
//   // };

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch('https://api.example.com/data'); // Replace with your API endpoint
//   //       if (response.ok) {
//   //         const jsonData = await response.json();
//   //         setFormData(jsonData);
//   //       } else {
//   //         throw new Error('Request failed');
//   //       }
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   // useEffect(() => {
//   //   // Filter data based on selected options
//   //   const filterData = () => {
//   //     let filteredResults = formData;

//   //     selectedOptions.forEach((option) => {
//   //       filteredResults = filteredResults.filter((item) => item[option]);
//   //     });

//   //     setFilteredData(filteredResults);
//   //   };

//   //   filterData();
//   // }, [formData, selectedOptions]);

//   // const handleClick = () => {
//   //   setShowPopup(true);
//   // };

//   // const handleSelectChange = (selectedOptions, selectedValues) => {
//   //   setFormData(selectedOptions);
//   //   const selectedOptions = selectedValues.map((option) => option.value);
//   //   setSelectedOptions(selectedOptions);
//   // };

//   const handleProfileCheck = (index) => {
//     setShowDetailsPopup(true);
//     setStudentIndex(index);
//     console.log(setShowDetailsPopup);
//   };

//   const handleGenerateReport = () => {
//     // setFilteredData(filteredData)
//     setShowPopup(true);
//     // Perform any desired action with the filteredData
//     // console.log(filteredData);
//     // You can generate the report or perform any other operations here
//   };

//   const handleGenerateChart = () => {
//     setShowChartPopup(true);
//     // setFilteredData(filteredData)
//     // setShowPopup
//     // Perform any desired action with the filteredData
//     // console.log(filteredData);
//     // You can generate the report or perform any other operations here
//   };

//   // const handleChange = (e) => {
//   //     setFormData({ ...formData, [e.target.name]: e.target.value });
//   //   };

//   const isAllSelected = conditionData.length > 0 && selected.length === conditionData.length;

//   const handleMultipleChange = (event) => {
//     const value = event.target.value;
//     if (value[value.length - 1] === 'all') {
//       setSelected(selected.length === conditionData.length ? [] : conditionData.map((c) => c.value));
//       return;
//     }
//     setSelected(value);
//   };

//   const handleClick = async () => {
//     // setShowChartPopup(true);
//     try {
//       setLoading(true);
//       setShowPopup(true);
//       let queryData;
//       const selectedData = selectformData;
//       if (!selectedData.find((data) => data.value === formData.field) && formData.field !== '') {
//         selectedData.push({ value: formData.field });
//       }
//       console.log({ selectedData });

//       if (!showInputText) {
//         if (formData.condition !== '') {
//           const table = lookupTable[formData.condition].name;
//           const columns = lookupTable[formData.condition].common;
//           const seperateTable = lookupTable[formData.condition].seperateTable;
//           console.log({ table, columns });
//           const requestObject = selectedData.map((data) => `s.${data.value}`);
//           if (seperateTable) {
//             queryData = `SELECT ${requestObject.join(', ')} FROM student s JOIN ${table} d ON s.${
//               formData.condition
//             } = d.${
//               formData.condition === 'faculty' ? 'facultyID' : formData.condition
//             } WHERE d.${columns} IN (${selected.map((d) => `'${d}'`).join(', ')})`;
//             console.log({ queryData });
//           } else {
//             const requestObject = selectedData.map((data) => `${data.value}`);
//             queryData = `SELECT  ${requestObject.join(', ')} FROM student WHERE ${columns} = '${formData.value}'`;
//           }
//         } else {
//           const requestObject = selectedData.map((data) => data.value);
//           queryData = `SELECT  ${requestObject.join(', ')} FROM student`;
//         }
//       } else {
//         const requestObject = selectedData.map((data) => data.value);
//         queryData = `SELECT  ${requestObject.join(', ')} FROM student WHERE ${formData.condition} = '${formData.text}'`;
//       }

//       let data = await retrieveData(queryData);
//       console.log({ data }, Object.keys(data));
//       setResultData(data);
//       setLoading(false);
//     } catch (e) {
//       console.log({ e });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectChange = (selectedOptions) => {
//     // Handle selected options
//     setSelectFormData(selectedOptions);
//     console.log(selectedOptions);
//   };
//   const handleChange = (e) => {
//     // Handle selected options
//     const dataValue = {
//       departmentID: departments,
//       faculty: faculties,
//       gender,
//       session: sessions,
//     };
//     console.log(e.target.value, e.target.name);
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (e.target.name === 'condition') {
//       let value = e.target.value;
//       if (
//         value === 'yearOFEntryIntoUI' ||
//         value === 'studentLastSurname' ||
//         value === 'studentFirstName' ||
//         value === 'studentMiddleName'
//       ) {
//         setShowInputText(true);
//       } else {
//         setShowInputText(false);
//         console.log(dataValue[e.target.value]);
//         setConditionData(dataValue[e.target.value]);
//       }
//     }
//   };

//   // const handleChange = (e) => {
//   //     setFormData({ ...formData, [e.target.name]: e.target.value });
//   //   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log(formData);
//   };
//   return (
//     <>
//       <Helmet>
//         <title> Dashboard: Reporting | Minimal UI </title>
//       </Helmet>

//       <Container>
//         {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
//           <BlogPostsSearch posts={POSTS} />
//           <BlogPostsSort options={SORT_OPTIONS} />
//         </Stack>

//         <Grid container spacing={3}>
//           {POSTS.map((post, index) => (
//             <BlogPostCard key={post.id} post={post} index={index} />
//           ))}
//         </Grid> */}

//         {/* Category selection */}

//         <div className={`form-container ${showPopup || showChartPopup || showDetailsPopup ? 'opacity-reduced' : ''}`}>
//           {/* <h2>Contact Form</h2> */}
//           <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//             <Typography variant="h4" gutterBottom>
//               Report Generation
//             </Typography>
//             {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
//                 New Post
//               </Button> */}
//           </Stack>

//           {/* <div className="category-selection">
//             <select id="email" name="category" value={formData.category} onChange={(e) => handleChange(e)} required>
//               <option value="">Select category</option>
//               <option value="john@example.com">Student</option>
//               <option value="jane@example.com">Staff</option>
//             </select>
//           </div> */}

//           <form onSubmit={handleSubmit}>
//             <div className="form-group multiselect">
//               <label htmlFor="name">Report Fields</label>
//               <Select
//                 isMulti
//                 // name="fields"
//                 options={options}
//                 className="multi-select"
//                 classNamePrefix="select"
//                 placeholder="Select students to display"
//                 // onChange={(e) =>handleChange(e)}
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
//                     fontSize: '14px',
//                     color: 'hsl(0, 0%, 20%)', // Adjust the font size here
//                   }),
//                 }}
//               />
//             </div>
//             <div className="line" />
//             <div className="form-group middle">
//               <label htmlFor="email">Field Conditions</label>
//               <select
//                 id="condition"
//                 name="condition"
//                 value={formData.condition}
//                 // selectedOptions={selectedOptions}
//                 onChange={(e) => handleChange(e)}
//                 required
//               >
//                 <option value="">Select conditions</option>
//                 <option value="john@example.com">First name</option>
//                 <option value="jane@example.com">Second name</option>
//                 <option value="mike@example.com">Faculty</option>
//                 <option value="mike@example.com">Department</option>
//                 <option value="mike@example.com">Gender</option>
//               </select>
//               <select
//                 id="operator"
//                 name="operator"
//                 value={formData.operator}
//                 onChange={(e) => handleChange(e)}
//                 required
//               >
//                 <option value="">Operator</option>
//                 <option value="john@example.com">Equal to</option>
//                 <option value="jane@example.com">Less than</option>
//                 <option value="mike@example.com">Greater than</option>
//                 <option value="mike@example.com">Not equal to</option>
//                 <option value="mike@example.com">Not less than</option>
//                 <option value="mike@example.com">Not greater than</option>
//               </select>
//               <select id="value" name="value" value={formData.value} onChange={(e) => handleChange(e)} required>
//                 <option value="">Enter value</option>
//                 <option value="john@example.com">john@example.com</option>
//                 <option value="jane@example.com">jane@example.com</option>
//                 <option value="mike@example.com">mike@example.com</option>
//               </select>
//             </div>
//             <div className="line" />
//             <div className="form-group">
//               <label htmlFor="message">Sort Fields</label>
//               <select id="field" name="field" value={formData.field} onChange={(e) => handleChange(e)} required>
//                 <option value="">Select Fields</option>
//                 <option value="firstname">First name</option>
//                 <option value="lastname">Last name</option>
//                 <option value="gender">Gender</option>
//                 <option value="department">Faculty</option>
//                 <option value="department">Department</option>
//               </select>

//               <select id="ascending" name="ascending" value={formData.message} onChange={handleChange} required>
//                 <option value="Ascending">Ascending</option>
//                 <option value="Descending">Descending</option>
//                 {/* <option value="Hi">Hi</option> */}
//                 {/* <option value="Greetings">Greetings</option> */}
//               </select>
//             </div>
//             <div className="line" />
//             <div className="submit-btn">
//               {/* <button type="submit" onClick={handleClick}><BsArrowRepeat size={20} style={{ marginRight: '8px' }}/>Generate Report</button> */}
//               <button type="submit" onClick={handleGenerateReport} style={{ marginRight: '8px' }}>
//                 <BsArrowRepeat size={20} style={{ marginRight: '8px' }} />
//                 <span className="button-text">Generate Report</span>
//               </button>

//               {/* Report Popup    */}
//             </div>
//             {showPopup && (
//               <div className="popup">
//                 <div className="report-container">
//                   <h2>Report</h2>
//                   <div className="table-container">
//                     <table className="table">
//                       <thead>
//                         <tr>
//                           <th>Id</th>
//                           <th>First Name</th>
//                           <th>Last Name</th>
//                           <th>Gender</th>
//                           <th>Faculty</th>
//                         </tr>

//                         {/* <tr>
//                               {selectedOptions.map((option) => (
//                                 <th key={option}>{option}</th>
//                               ))}
//                             </tr> */}
//                       </thead>
//                       <tbody>
//                         {tableData.map((row, index) => (
//                           <tr key={row.id} onClick={() => handleProfileCheck(index)}>
//                             <td>{row.id}</td>
//                             <td>{row.firstName}</td>
//                             <td>{row.lastName}</td>
//                             <td>{row.gender}</td>
//                             <td>{row.faculty}</td>
//                           </tr>
//                         ))}

//                         {/* {filteredData.map((item) => (
//                                 <tr key={item.id}>
//                                   {selectedOptions.map((option) => (
//                                     <td key={option}>Dummy Text</td>
//                                   ))}
//                                 </tr>
//                               ))} */}

//                         {/* <tr>
//                               <td>John</td>
//                               <td>Doe</td>
//                               <td>Male</td>
//                               <td>Engineering</td>
//                             </tr>
//                             <tr>
//                               <td>Jane</td>
//                               <td>Smith</td>
//                               <td>Female</td>
//                               <td>Science</td>
//                             </tr> */}
//                         {/* Add more rows as needed */}
//                       </tbody>
//                     </table>
//                   </div>
//                   <div className="submit-btn">
//                     {/* <Link to="/chart" style={{ textDecoration: "none" }}>
//                             <button type="submit" onClick={handleClick} >
//                               <BsArrowRepeat size={20} style={{ marginRight: '8px' }}/>
//                               <span className="button-text" onClick={handleGenerateChart}>Generate Charts</span>
//                             </button>
//                         </Link> */}

//                     <button
//                       type="submit"
//                       onClick={handleGenerateChart}
//                       className="close-button"
//                       style={{ marginRight: '8px' }}
//                     >
//                       <BsArrowRepeat size={20} style={{ marginRight: '8px' }} />
//                       <span className="button-text">Generate Charts</span>
//                     </button>

//                     {/* <Link to="/chart" style={{ textDecoration: "none" }}>
//                           <button type="submit" onClick={handleClick} className='close-button' style={{ marginRight: '8px' }}>
//                                 <BsArrowRepeat size={20} style={{ marginRight: '8px' }}/>
//                                 <span className="button-text" onClick={handleGenerateChart}>Generate Charts</span>
//                           </button>
//                         </Link> */}
//                     <button className="close-button" onClick={() => setShowPopup(false)}>
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Profile popup */}
//             {showDetailsPopup && (
//               <Dialog
//                 onClose={() => setShowDetailsPopup(false)}
//                 scroll="paper"
//                 fullWidth
//                 sx={{ height: '100%' }}
//                 maxWidth="md"
//                 keepMounted
//                 open={showDetailsPopup}
//               >
//                 <DialogContent>
//                   {/* <div className="popup">
//                       <div className="report-container"> */}
//                   <DialogTitle className="profile-title">
//                     <h2>Profile</h2>
//                   </DialogTitle>
//                   <div className="image-container">
//                     <div className="profile-img">
//                       <img src={tableData[studentIndex].image} alt="studentImages" />
//                     </div>
//                     <div className="profile-name">
//                       <p>
//                         {tableData[studentIndex].firstName} {tableData[studentIndex].middleName}{' '}
//                         {tableData[studentIndex].lastName}{' '}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="student-profile">
//                     {/* <div className="profile-image-section">
//                             <img src={student.profileImage} alt="Profile" />
//                           </div> */}
//                     <div className="profile-details">
//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">First Name:</div>
//                           <input type="text" value={tableData[studentIndex].firstName} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Middle Name:</div>
//                           <input type="text" value={tableData[studentIndex].middleName} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Last Name:</div>
//                           <input type="text" value={tableData[studentIndex].lastName} readOnly />
//                         </Grid>
//                       </Grid>

//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Department ID:</div>
//                           <input type="text" value={tableData[studentIndex].departmentID} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Faculty:</div>
//                           <input type="text" value={tableData[studentIndex].faculty} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Email:</div>
//                           <input type="text" value={tableData[studentIndex].email} readOnly />
//                         </Grid>
//                       </Grid>

//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Email:</div>
//                           <input type="text" value={tableData[studentIndex].email} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Gender:</div>
//                           <input type="text" value={tableData[studentIndex].gender} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Date of Birth:</div>
//                           <input type="text" value={tableData[studentIndex].dateOfBirth} readOnly />
//                         </Grid>
//                       </Grid>

//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Nationality:</div>
//                           <input type="text" value={tableData[studentIndex].nationality} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Year of Entry:</div>
//                           <input type="text" value={tableData[studentIndex].yearOfEntryIntoUI} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Mode of Entry:</div>
//                           <input type="text" value={tableData[studentIndex].modeOfEntry} readOnly />
//                         </Grid>
//                       </Grid>

//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">State of Origin:</div>
//                           <input type="text" value={tableData[studentIndex].stateOfOrigin} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label"> LGA:</div>
//                           <input type="text" value={tableData[studentIndex].Lga} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Home Town:</div>
//                           <input type="text" value={tableData[studentIndex].homeTown} readOnly />
//                         </Grid>
//                       </Grid>

//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Permanent Address:</div>
//                           <input type="text" value={tableData[studentIndex].permanentAddress} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Study Status:</div>
//                           <input type="text" value={tableData[studentIndex].studyStatus} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Study Level:</div>
//                           <input type="text" value={tableData[studentIndex].studyLevel} readOnly />
//                         </Grid>
//                       </Grid>

//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Programme Entry Year:</div>
//                           <input type="text" value={tableData[studentIndex].presentProgrammeEntryYear} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Matric Number:</div>
//                           <input type="text" value={tableData[studentIndex].MatricNum} readOnly />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">JAMB Registration Number:</div>
//                           <input type="text" value={tableData[studentIndex].jambRegNumber} readOnly />
//                         </Grid>
//                       </Grid>

//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={4} className="grid-input">
//                           <div className="profile-label">Marital Status:</div>
//                           <input type="text" value={tableData[studentIndex].maritalStatus} readOnly />
//                         </Grid>
//                       </Grid>

//                       {/* <div className="profile-row">

//                             </div> */}
//                       <div className="profile-row"></div>
//                       <div className="profile-row"></div>
//                       <div className="profile-row"></div>
//                       <div className="profile-row"></div>
//                       <div className="profile-row"></div>
//                       <div className="profile-row"></div>
//                     </div>
//                   </div>
//                   <div className="submit-btn">
//                     {/* <Link to="/chart" style={{ textDecoration: "none" }}>
//                               <button type="submit" onClick={handleClick} >
//                                 <BsArrowRepeat size={20} style={{ marginRight: '8px' }}/>
//                                 <span className="button-text" onClick={handleGenerateChart}>Generate Charts</span>
//                               </button>
//                           </Link> */}

//                     {/* <button type="submit" onClick={handleClick} className='close-button' style={{ marginRight: '8px' }}>
//                                 <BsArrowRepeat size={20} style={{ marginRight: '8px' }}/>
//                                 <span className="button-text" onClick={handleGenerateChart}>Generate Charts</span>
//                           </button> */}

//                     {/* <Link to="/chart" style={{ textDecoration: "none" }}>
//                             <button type="submit" onClick={handleClick} className='close-button' style={{ marginRight: '8px' }}>
//                                   <BsArrowRepeat size={20} style={{ marginRight: '8px' }}/>
//                                   <span className="button-text" onClick={handleGenerateChart}>Generate Charts</span>
//                             </button>
//                           </Link> */}
//                     {/* <button className="close-button" onClick={() => setShowDetailsPopup(false)}>
//                             Close
//                           </button> */}

//                     {/* </div>
//                     </div> */}
//                   </div>{' '}
//                 </DialogContent>
//                 <DialogActions>
//                   <Button
//                     sx={{ color: 'red', width: '150px' }}
//                     className="close-button"
//                     variant="filled"
//                     onClick={() => setShowDetailsPopup(false)}
//                   >
//                     {' '}
//                     Close{' '}
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//             )}

//             {/* Chart Popup */}
//             {showChartPopup && (
//               <div className="popup">
//                 <div className="report-container">
//                   <div className="chart-content">
//                     <div className="chart-selection">
//                       <select
//                         id="field"
//                         name="field"
//                         className="faculty-select"
//                         value={selectedCategory}
//                         onChange={handleSelectedCategory}
//                         required
//                       >
//                         {/* <option value="">Select Chart</option> */}
//                         <option value="bar">Faculty</option>
//                         <option value="area">Department</option>
//                         <option value="line">Programme</option>
//                       </select>

//                       <select
//                         id="field"
//                         name="field"
//                         className="chart-select"
//                         value={selectedChart}
//                         onChange={handleChartSelect}
//                       >
//                         {/* <option value="">Select Chart</option> */}
//                         <option value="bar">Bar Chart</option>
//                         <option value="area">Area Chart</option>
//                         <option value="line">Line Chart</option>
//                         <option value="radar">Radar Chart</option>
//                         <option value="scatter">Scatter Chart</option>
//                         <option value="heatmap">Heatmap Chart</option>
//                         <option value="pie">Pie Chart</option>
//                         <option value="polar">Polar Area Chart</option>
//                         <option value="bubble">Bubble Chart</option>
//                         <option value="doughnut">Doughnut Chart</option>
//                       </select>

//                       {/* {selectedChart === 'bar' && (
//                               <div className="arrow-container">
//                                 <span className="arrow"></span>
//                                 <select>
//                                   <option value="vertical">Vertical Bar Chart</option>
//                                   <option value="horizontal">Horizontal Bar Chart</option>
//                                   <option value="stacked">Stacked Bar Chart</option>
//                                   <option value="grouped">Grouped Bar Chart</option>
//                                 </select>
//                               </div>
//                             )} */}
//                     </div>

//                     <div>
//                       <Charts
//                         handleChartSelect={handleChartSelect}
//                         loading={loading}
//                         setSelectedChart={setSelectedChart}
//                         selectedChart={selectedChart}
//                         selectedCategory={selectedCategory}
//                       />
//                     </div>
//                   </div>
//                   <div className="chart-submit-btn">
//                     <button className="close-button" onClick={() => setShowChartPopup(false)}>
//                       Close
//                     </button>
//                   </div>
//                 </div>

//                 {/* <Link to="/chart" style={{ textDecoration: "none" }}>
//                           <button type="submit" onClick={handleClick} className='close-button' style={{ marginRight: '8px' }}>
//                                 <BsArrowRepeat size={20} style={{ marginRight: '8px' }}/>
//                                 <span className="button-text" onClick={handleGenerateChart}>Generate Charts</span>
//                           </button>
//                         </Link> */}
//               </div>
//             )}
//           </form>
//         </div>
//       </Container>
//     </>
//   );
// }

import React from 'react';

const ReportingPage = () => {
  return <div>ReportingPage</div>;
};

export default ReportingPage;
