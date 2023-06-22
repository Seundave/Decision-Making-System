import React, { useState } from 'react';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import '../settings.css';
import { BsArrowRepeat } from 'react-icons/bs';
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

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: '',
    operator: '',
    value: '',
    field: '',
    ascending: '',
  });

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
        <title> Dashboard: Settings | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button> */}
        </Stack>

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
        <div className="admin-settings-container">
          {/* <h1>Admin Settings</h1> */}
          {/* <form className="admin-settings-form">
                <label htmlFor="schoolName">School Name</label>
                <input type="text" id="schoolName" name="schoolName" />

                <label htmlFor="adminName">Admin Name</label>
                <input type="text" id="adminName" name="adminName" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />

                <button type="submit">Save Changes</button>
            </form> */}
        </div>
      </Container>
    </>
  );
}
