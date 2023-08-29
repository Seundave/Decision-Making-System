import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Select, MenuItem, Paper } from '@mui/material';
// components
import Iconify from '../components/iconify';
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

export default function StudentPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Student Page </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Student Page
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            {/* <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} /> */}
            <AppWidgetSummary title="Total Number of Graduates" number={714000}  />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Student Enrolment" number={1352831}  />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Distance Learning Centre" number={1723315}  />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Affiliated Institutions" number={234}  />
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
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
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
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
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
        <Paper elevation={4} sx={{backgroundColor:"white", padding:"40px", marginTop:"30px", borderRadius:"10px"}}>
          {/* Academic staff */}
          <Typography variant='h5' sx={{margin:"10px 0px"}}>Student Statistics</Typography>
          {/* <Typography variant='h6' sx={{margin:"10px 0px"}}>Total Student Enrolment</Typography> */}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} className="grid-input">
                {/* <div className="profile-label">Academic:</div> */}
                <input type="text" value="Total Student Enrolment" readOnly />
                {/* <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
                  <MenuItem value="placeholder">Academic</MenuItem>
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
              </Select> */}
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
            <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
              <MenuItem value="placeholder">Year</MenuItem>
              <MenuItem value="option1">2015/2016</MenuItem>
              <MenuItem value="option2">2016/2017</MenuItem>
              <MenuItem value="option3">2017/2018</MenuItem>
              <MenuItem value="option3">2018/2019</MenuItem>
              <MenuItem value="option3">2020/2021</MenuItem>
            </Select>
                {/* <div className="profile-label">Year:</div>
                <input type="text" value="" readOnly /> */}
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
                {/* <div className="profile-label">Value:</div> */}
                <input type="text" value="Value" readOnly />
            </Grid>
          </Grid>
          <Typography variant='body1' sx={{margin:"10px 0px"}}>By Gender</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} className="grid-input">
            <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
              <MenuItem value="placeholder">Gender</MenuItem>
              <MenuItem value="option1">Male</MenuItem>
              <MenuItem value="option2">Female</MenuItem>
            </Select>
                {/* <div className="profile-label">Gender:</div>
                <input type="text" value="" readOnly /> */}
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
                {/* <div className="profile-label">Year:</div>
                <input type="text" value="" readOnly /> */}
                <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
                  <MenuItem value="placeholder">Year</MenuItem>
                  <MenuItem value="option1">2015/2016</MenuItem>
                  <MenuItem value="option2">2016/2017</MenuItem>
                  <MenuItem value="option3">2017/2018</MenuItem>
                  <MenuItem value="option3">2018/2019</MenuItem>
                  <MenuItem value="option3">2020/2021</MenuItem>
                    </Select>
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
                {/* <div className="profile-label">Value:</div> */}
                <input type="text" value="Value" readOnly />
            </Grid>
          </Grid>
          <Typography variant='body1' sx={{margin:"10px 0px"}}>By Faculty</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} className="grid-input">
                {/* <div className="profile-label">Faculty:</div>
                <input type="text" value="" readOnly /> */}
                <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
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
                {/* <div className="profile-label">Year:</div>
                <input type="text" value="" readOnly /> */}
                <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
                  <MenuItem value="placeholder">Year</MenuItem>
                  <MenuItem value="option1">2015/2016</MenuItem>
                  <MenuItem value="option2">2016/2017</MenuItem>
                  <MenuItem value="option3">2017/2018</MenuItem>
                  <MenuItem value="option3">2018/2019</MenuItem>
                  <MenuItem value="option3">2020/2021</MenuItem>
                    </Select>
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
                {/* <div className="profile-label">Value:</div> */}
                <input type="text" value="Value" readOnly />
            </Grid>
            
          </Grid>
          <Typography variant='body1' sx={{margin:"10px 0px"}}>By Level of Programme</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} className="grid-input">
              <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
                <MenuItem value="placeholder">Level of Programme</MenuItem>
                <MenuItem value="option1">Postgraduate (Full-Time)</MenuItem>
                <MenuItem value="option2">Undergraduate (Full-Time)</MenuItem>
                <MenuItem value="option2">Postgraduate (Part-Time)</MenuItem>
                <MenuItem value="option2">Distance Learning Centre</MenuItem>
                <MenuItem value="option2">Affliated Institutions</MenuItem>
              </Select>
                  {/* <div className="profile-label">Gender:</div>
                  <input type="text" value="" readOnly /> */}
              </Grid>
              <Grid item xs={12} sm={4} className="grid-input">
                  {/* <div className="profile-label">Year:</div>
                  <input type="text" value="" readOnly /> */}
                  <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
                    <MenuItem value="placeholder">Year</MenuItem>
                    <MenuItem value="option1">2015/2016</MenuItem>
                    <MenuItem value="option2">2016/2017</MenuItem>
                    <MenuItem value="option3">2017/2018</MenuItem>
                    <MenuItem value="option3">2018/2019</MenuItem>
                    <MenuItem value="option3">2020/2021</MenuItem>
                      </Select>
              </Grid>
              <Grid item xs={12} sm={4} className="grid-input">
                  {/* <div className="profile-label">Value:</div> */}
                  <input type="text" value="Value" readOnly />
              </Grid>
            </Grid>
            <Typography variant='body1' sx={{margin:"10px 0px"}}>New Entrants</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} className="grid-input">
              <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
                <MenuItem value="placeholder">New Entrants</MenuItem>
                <MenuItem value="option1">New Postgraduate (PG)</MenuItem>
                <MenuItem value="option2">New Undergraduate (UG)</MenuItem>
              </Select>
                  {/* <div className="profile-label">Gender:</div>
                  <input type="text" value="" readOnly /> */}
              </Grid>
              <Grid item xs={12} sm={4} className="grid-input">
                  {/* <div className="profile-label">Year:</div>
                  <input type="text" value="" readOnly /> */}
                  <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
                    <MenuItem value="placeholder">Year</MenuItem>
                    <MenuItem value="option1">2015/2016</MenuItem>
                    <MenuItem value="option2">2016/2017</MenuItem>
                    <MenuItem value="option3">2017/2018</MenuItem>
                    <MenuItem value="option3">2018/2019</MenuItem>
                    <MenuItem value="option3">2020/2021</MenuItem>
                      </Select>
              </Grid>
              <Grid item xs={12} sm={4} className="grid-input">
                  {/* <div className="profile-label">Value:</div> */}
                  <input type="text" value="Value" readOnly />
              </Grid>
            </Grid>
          
          {/* End of academic staff */}
          {/* Start of non-academic staff */}
          {/* <Typography variant='h6' sx={{margin:"10px 0px"}}>Total Staff (Non-Academic)</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} className="grid-input">
                <input type="text" value="Non-Academic" readOnly />
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
                <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
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
          </Grid>
          <Typography variant='body1' sx={{margin:"10px 0px"}}>By Gender</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} className="grid-input">
                <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
                  <MenuItem value="placeholder">Gender</MenuItem>
                  <MenuItem value="option1">Male</MenuItem>
                  <MenuItem value="option2">Female</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
                <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
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
          </Grid>
          <Typography variant='body1' sx={{margin:"10px 0px"}}>By Category</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} className="grid-input">
                <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
                  <MenuItem value="placeholder">Category</MenuItem>
                  <MenuItem value="option1">Senior Technical Staff</MenuItem>
                  <MenuItem value="option2">Senior Administrative Staff</MenuItem>
                  <MenuItem value="option3">Senior Secretariat Staff</MenuItem>
                  <MenuItem value="option3">Junior Staff</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} sm={4} className="grid-input">
                <Select defaultValue="placeholder" fullWidth sx={{height:"40px"}}>
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
        </Paper>
      </Container>
    </>
  );
}
