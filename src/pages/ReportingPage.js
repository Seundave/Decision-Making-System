import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import '../form.css'
import { BsArrowRepeat } from 'react-icons/bs'
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';


// ----------------------------------------------------------------------

// const SORT_OPTIONS = [
//   { value: 'latest', label: 'Latest' },
//   { value: 'popular', label: 'Popular' },
//   { value: 'oldest', label: 'Oldest' },
// ];

const options = [
    { value: 'FirstName', label: 'First name' },
    { value: 'SecondName', label: 'Second name' },
    { value: 'Department', label: 'Department' },
    { value: 'Level', label: 'Level' },
    { value: 'Gender', label: 'Gender' },
    { value: 'Faculty', label: 'Faculty' },
  ];

  // const Table = () => {
  //   Mock data for the table
  //   const tableData = [
  //     { id: 1, firstName: 'John', lastName: 'Doe', gender:'Male', faculty:'Technology' },
  //     { id: 2, firstName: 'Jane', lastName: 'Smith', gender:'Female', faculty:'Science'},
  //     { id: 3, firstName: 'Bob', lastName:'Johnson', gender:'Male', faculty:'Arts' },
  //   ];
  // }

  const tableData = [
    { id: 1, firstName: 'John', lastName: 'Doe', gender:'Male', faculty:'Technology' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', gender:'Female', faculty:'Science'},
    { id: 3, firstName: 'Bob', lastName:'Johnson', gender:'Male', faculty:'Arts' },
  ];
// ----------------------------------------------------------------------

export default function BlogPage() {
    const [showPopup, setShowPopup] = useState(false);
    const[formData, setFormData] = useState({
        name: '',
        category: '',
        condition: '',
        operator:'',
        value:'',
        field:'',
        ascending:''
    })

    const handleClick = () => {
        setShowPopup(true);
      };

    const handleChange = (selectedOptions) => {
    // Handle selected options
    setFormData(selectedOptions);
    console.log(selectedOptions);
  };

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    //   };

      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
      };
  return (
    <>
      <Helmet>
        <title> Dashboard: Reporting | Minimal UI </title>
      </Helmet>
      

      <Container>
        

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid> */}

        {/* Category selection */}
       

        <div className={`form-container ${showPopup ? 'opacity-reduced' : ''}`}>
            {/* <h2>Contact Form</h2> */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Report Generation
              </Typography>
              {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Post
              </Button> */}
            </Stack>
        

        <div className="category-selection">
            <select 
                id="email"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
            >
                <option value="">Select category</option>
                <option value="john@example.com">Student</option>
                <option value="jane@example.com">Staff</option>
                {/* <option value="mike@example.com">mike@example.com</option> */}
            </select>
        </div>


            <form onSubmit={handleSubmit}>
                <div className="form-group multiselect">
                    <label htmlFor="name">Report Fields</label>
                    <Select
                        isMulti
                        options={options}
                        className="multi-select"
                        classNamePrefix="select"
                        placeholder="Select students to display"
                        onChange={handleChange}
                        styles={{
                            control: (provided) => ({
                              ...provided,
                              fontSize: '14px',
                              color: 'hsl(0, 0%, 20%)' // Adjust the font size here
                            }),
                          }}
                        />
                </div>
                <div className='line'/>
                <div className="form-group middle">
                    <label htmlFor="email">Field Conditions</label>
                    <select 
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select conditions</option>
                        <option value="john@example.com">First name</option>
                        <option value="jane@example.com">Second name</option>
                        <option value="mike@example.com">Faculty</option>
                        <option value="mike@example.com">Department</option>
                        <option value="mike@example.com">Gender</option>
                    </select>
                    <select
                        id="operator"
                        name="operator"
                        value={formData.operator}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Operator</option>
                        <option value="john@example.com">Equal to</option>
                        <option value="jane@example.com">Less than</option>
                        <option value="mike@example.com">Greater than</option>
                        <option value="mike@example.com">Not equal to</option>
                        <option value="mike@example.com">Not less than</option>
                        <option value="mike@example.com">Not greater than</option>
                    </select>
                    <select
                        id="value"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Enter value</option>
                        <option value="john@example.com">john@example.com</option>
                        <option value="jane@example.com">jane@example.com</option>
                        <option value="mike@example.com">mike@example.com</option>
                    </select>
                </div>
                <div className='line'/>
                <div className="form-group">
                <label htmlFor="message">Sort Fields</label>
                <select
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Fields</option>
                    <option value="Hello">Hello</option>
                    <option value="Hi">Hi</option>
                    <option value="Greetings">Greetings</option>
                </select>

                <select
                    id="ascending"
                    name="ascending"
                    value={formData.message}
                    onChange={handleChange}
                    required
                >
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                    {/* <option value="Hi">Hi</option> */}
                    {/* <option value="Greetings">Greetings</option> */}
                </select>
                </div>
                <div className='line'/>
                <div className="submit-btn" >
                    {/* <button type="submit" onClick={handleClick}><BsArrowRepeat size={20} style={{ marginRight: '8px' }}/>Generate Report</button> */}
                    <button type="submit" onClick={handleClick}>
                      <BsArrowRepeat size={20} style={{ marginRight: '8px' }}/>
                      <span className="button-text">Generate Report</span>
                    </button>
                </div>
                {showPopup && (
                    <div className="popup">
                      <div className="report-container">
                      <h2>Report</h2>
                      <div className="table-container">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Id</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Gender</th>
                              <th>Faculty</th>
                            </tr>
                          </thead>
                          <tbody>

                            {tableData.map((row) => (
                              <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>
                                <Link to={`/profile/${row.id}`}>{row.firstName}</Link>
                                </td>
                                <td>{row.lastName}</td>
                                <td>{row.gender}</td>
                                <td>{row.faculty}</td>
                              </tr>
                            ))}
                            {/* <tr>
                              <td>John</td>
                              <td>Doe</td>
                              <td>Male</td>
                              <td>Engineering</td>
                            </tr>
                            <tr>
                              <td>Jane</td>
                              <td>Smith</td>
                              <td>Female</td>
                              <td>Science</td>
                            </tr> */}
                            {/* Add more rows as needed */}
                          </tbody>
                        </table>
                      </div>
                      <div className='submit-btn'>
                        <button className="close-button" onClick={() => setShowPopup(false)}>
                          Close
                        </button>
                      </div>
                      </div>
                    </div>
                )}
                
            </form>
            </div>
        
      </Container>
    </>
  );
}
