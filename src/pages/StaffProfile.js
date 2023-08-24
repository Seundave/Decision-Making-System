import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Select, MenuItem } from '@mui/material';
// components
import Iconify from '../components/iconify';
import axios from 'axios'
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function StaffPage() {
  const [staffData, setStaffData] = useState([]);
  const [showGender, setShowGender] = useState(false);
  const [data, setData] = useState({
    category: '',
    gender: '',
    faculty: '',
  });
  const theme = useTheme();

  const categories = ['Gender', 'Faculty', 'Others'];
  const Gender = ['Male', 'Female'];
  const Faculty = ['Arts', 'Technology', 'Science', 'Music'];
  // console.log(categories[0]);

  // console.log(categories.gender);

  function handleCategoryChange(e) {
    setData((prev) => ({ ...prev, category: e.target.value }));
    // setData(e.target.value);
  }

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('');
        setStaffData(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.category !== 'placeholder' && data.category !== '') {
      setShowGender(true);
    } else {
      setShowGender(false);
    }
  }, [data.category]);

  console.log(showGender);
  return (
    <>
      <Helmet>
        <title> Staff Page </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Staff's Page
        </Typography>

        <Grid container spacing={3}>
          {/* {staffData.map ((item) =>{

          })} */}
          <Grid item xs={12} sm={6} md={3}>
            {/* <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} /> */}
            <AppWidgetSummary title="Total Number of Senior Technical Staffs" number={714000} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Senior Technical Staffs" number={1352831} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Senior Secretariat Staff" number={1723315} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Junior Staffs in UI" number={234} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Academic Staff by Rank 2021"
              chartData={[
                { label: 'Assistant Lecturer', value: 4344 },
                { label: 'Lecturer I & II', value: 5435 },
                { label: 'Senior Lecturer', value: 1443 },
                { label: 'Professor & Reader', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Percentage of Academic Staff with Ph.D"
              // subheader="(+43%) than last year"
              chartData={[
                { label: 'Clinical Sciences', value: 400 },
                { label: 'Dentistry', value: 430 },
                { label: 'Library', value: 448 },
                { label: 'Law', value: 470 },
                { label: 'Public Health', value: 540 },
                { label: 'Basic Medical Sciences', value: 580 },
                { label: 'Vertinary Medicine', value: 690 },
                { label: 'Pharmacy', value: 1100 },
                { label: 'ARCIS', value: 1200 },
                { label: 'Technology', value: 1380 },
                { label: 'Science', value: 1420 },
                { label: 'Arts', value: 1450 },
                { label: 'Agricultural & Forestry', value: 1500 },
                { label: 'The Social Sciences', value: 1530 },
                { label: 'IAS', value: 1580 },
                { label: 'Yoruba Center', value: 1700 },
                { label: 'IOE', value: 1730 },
                { label: 'Education', value: 1760 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Academic Staff by Rank"
              chartLabels={['Professor & Reader', 'Senior Lecturer', 'Lecturers I & II', 'Assistant Lecturer']}
              chartData={[
                { name: 'Year 2015/2016', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Year 2016/2017', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Year 2018/2019', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
                { id: '6', label: 'Stakeholder Meeting' },
              ]}
            />
          </Grid>
        </Grid>

        {/* Start of staff details */}
        <Paper
          elevation={4}
          sx={{ backgroundColor: 'white', padding: '40px', marginTop: '30px', borderRadius: '10px' }}
        >
          {/* Academic staff */}
          <Typography variant="h5" sx={{ margin: '10px 0px' }}>
            Staff Statistics
          </Typography>
          <Typography variant="h6" sx={{ margin: '10px 0px' }}>
            Total Staff (Academic)
          </Typography>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={data.category !== 'placeholder' && data.category !== '' ? 3 : 4}
              className="grid-input"
            >
              {/* <div className="profile-label">Academic:</div> */}
              {/* <input type="text" value="Academic" readOnly /> */}
              <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }} onChange={handleCategoryChange}>
                <MenuItem value="placeholder">Condition</MenuItem>
                {categories.map((item, index) => {
                  return (
                    <MenuItem key={index + 1} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}

                {/* <MenuItem value="option3">Option 3</MenuItem> */}
              </Select>
            </Grid>
            {data.category === 'Gender' && (
              <Grid item xs={12} sm={data.category !== 'placeholder' && data.category !== '' ? 3 : 4}>
                <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }}>
                  <MenuItem value="placeholder"> Select your gender</MenuItem>
                  {Gender.map((items, index) => {
                    return (
                      <MenuItem key={index + 1} value={items}>
                        {items}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            )}

            {data.category === 'Faculty' && (
              <Grid item xs={12} sm={data.category !== 'placeholder' && data.category !== '' ? 3 : 4}>
                <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }}>
                  <MenuItem value="placeholder"> Select your faculty</MenuItem>
                  {Faculty.map((items, index) => {
                    return (
                      <MenuItem key={index + 1} value={items}>
                        {items}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              sm={data.category !== 'placeholder' && data.category !== '' ? 3 : 4}
              className="grid-input"
            >
              <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }}>
                <MenuItem value="placeholder">Year</MenuItem>
                <MenuItem value="option1">2015/2016</MenuItem>
                <MenuItem value="option2">2016/2017</MenuItem>
                <MenuItem value="option3">2017/2018</MenuItem>
                <MenuItem value="option3">2018/2019</MenuItem>
                <MenuItem value="option3">2020/2021</MenuItem>
              </Select>
            </Grid>
            <Grid
              item
              xs={12}
              sm={data.category !== 'placeholder' && data.category !== '' ? 3 : 4}
              className="grid-input"
            >
              <input type="text" value="Value" readOnly />
            </Grid>
          </Grid>
          {/* <Typography variant="body1" sx={{ margin: '10px 0px' }}>
            By Gender
          </Typography> */}
          {/* <Grid container spacing={1}>
            <Grid item xs={12} sm={4} className="grid-input">
              <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }}>
                <MenuItem value="placeholder">Gender</MenuItem>
                <MenuItem value="option1">Male</MenuItem>
                <MenuItem value="option2">Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
              <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }}>
                <MenuItem value="placeholder">Year</MenuItem>
                <MenuItem value="option1">2015/2016</MenuItem>
                <MenuItem value="option2">2016/2017</MenuItem>
                <MenuItem value="option3">2017/2018</MenuItem>
                <MenuItem value="option3">2018/2019</MenuItem>
                <MenuItem value="option3">2020/2021</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
              <input type="text" value="Value" readOnly />
            </Grid>
          </Grid> */}
          {/* <Typography variant="body1" sx={{ margin: '10px 0px' }}>
            By Faculty
          </Typography> */}
          {/* <Grid container spacing={1}>
            <Grid item xs={12} sm={4} className="grid-input">
              <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }}>
                <MenuItem value="placeholder">Faculty</MenuItem>
                <MenuItem value="option1">Agricultural & Forestry</MenuItem>
                <MenuItem value="option2">Arts</MenuItem>
                <MenuItem value="option3">Public Health</MenuItem>
                <MenuItem value="option3">Science</MenuItem>
                <MenuItem value="option3">The Social Sciences</MenuItem>
                <MenuItem value="option3">Technology</MenuItem>
                <MenuItem value="option3">Vertinary Medicine</MenuItem>
                <MenuItem value="option3">Law</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
              <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }}>
                <MenuItem value="placeholder">Year</MenuItem>
                <MenuItem value="option1">2015/2016</MenuItem>
                <MenuItem value="option2">2016/2017</MenuItem>
                <MenuItem value="option3">2017/2018</MenuItem>
                <MenuItem value="option3">2018/2019</MenuItem>
                <MenuItem value="option3">2020/2021</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
              <input type="text" value="Value" readOnly />
            </Grid>
          </Grid> */}
          {/* End of academic staff */}
          {/* Start of non-academic staff */}
          <Typography variant="h6" sx={{ margin: '10px 0px' }}>
            Total Staff (Non-Academic)
          </Typography>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={data.category !== 'placeholder' && data.category !== '' ? 3 : 4}
              className="grid-input"
            >
              {/* <div className="profile-label">Academic:</div> */}
              {/* <input type="text" value="Academic" readOnly /> */}
              <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }} onChange={handleCategoryChange}>
                <MenuItem value="placeholder">Condition</MenuItem>
                {categories.map((item, index) => {
                  return (
                    <MenuItem key={index + 1} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}

                {/* <MenuItem value="option3">Option 3</MenuItem> */}
              </Select>
            </Grid>
            {data.category === 'Gender' && (
              <Grid item xs={12} sm={data.category !== 'placeholder' && data.category !== '' ? 3 : 4}>
                <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }}>
                  <MenuItem value="placeholder"> Select your gender</MenuItem>
                  {Gender.map((items, index) => {
                    return (
                      <MenuItem key={index + 1} value={items}>
                        {items}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            )}

            {data.category === 'Faculty' && (
              <Grid item xs={12} sm={data.category !== 'placeholder' && data.category !== '' ? 3 : 4}>
                <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }}>
                  <MenuItem value="placeholder"> Select your faculty</MenuItem>
                  {Faculty.map((items, index) => {
                    return (
                      <MenuItem key={index + 1} value={items}>
                        {items}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              sm={data.category !== 'placeholder' && data.category !== '' ? 3 : 4}
              className="grid-input"
            >
              <Select defaultValue="placeholder" fullWidth sx={{ height: '40px' }}>
                <MenuItem value="placeholder">Year</MenuItem>
                <MenuItem value="option1">2015/2016</MenuItem>
                <MenuItem value="option2">2016/2017</MenuItem>
                <MenuItem value="option3">2017/2018</MenuItem>
                <MenuItem value="option3">2018/2019</MenuItem>
                <MenuItem value="option3">2020/2021</MenuItem>
              </Select>
            </Grid>
            <Grid
              item
              xs={12}
              sm={data.category !== 'placeholder' && data.category !== '' ? 3 : 4}
              className="grid-input"
            >
              <input type="text" value="Value" readOnly />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

{
  /* <div className="profile-label">Gender:</div>
                <input type="text" value="" readOnly /> */
}
