import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
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
import { useContext, useEffect, useState } from 'react';
import { AuthContext, useAuthContext } from 'src/routes';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  // const { currentUser } = useContext(AuthContext);
  const { currentUser } = useAuthContext();
  const [summaryData, setSummaryData] = useState({
    male: '',
    female: '',
  });
  const [otherData, setOtherData] = useState([
    { label: 'Graduated', value: 0 },
    { label: 'Undergraduate', value: 0 },
    { label: 'PG', value: 0 },
    { label: 'DLC', value: 0 },
  ]);
  const [country, setCountries] = useState([
    { label: 'Graduated', value: 0 },
    { label: 'Undergraduate', value: 0 },
    { label: 'PG', value: 0 },
  ]);
  const [user, setUser] = useState({});
  const fetchData = async () => {
    const data = JSON.parse(localStorage.getItem('userDetails'));
    console.log({ data });
    try {
      const response = await fetch('http://localhost:5000/api/student/get/summaryData', {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      }); // Replace with your API endpoint

      if (response.status === 200) {
        const jsonData = await response.json();
        console.log({ jsonData }); // Check the structure of jsonData
        const male = jsonData.results.students.filter((student) => student.gender === 'M').length;

        // Filter female students
        const female = jsonData.results.students.filter((student) => student.gender === 'F').length;
        // Assuming jsonData.results has the structure you mentioned
        console.log({ male, female });
        setSummaryData({ male, female, students: jsonData.results.students.length });
        const data = jsonData.results.nationalStudents;
        console.log();
        setCountries(
          Object.keys(data).map((label) => ({
            label,
            value: data[label],
          }))
        );
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/student/students'); // Replace with your API endpoint
      console.log({ response });
      if (response.status === 200) {
        const jsonData = await response.json();
        console.log(jsonData, 'keke');
        const data = jsonData.facultyStudentCounts;

        setOtherData(
          Object.keys(data).map((label) => ({
            label,
            value: data[label],
          }))
        );
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('userDetails');

    if (data) {
      setUser(JSON.parse(data));
    }
    fetchData();
    fetchInfo();
  }, []);
  console.log({ currentUser });

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi {user?.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of students" number={summaryData.students ?? 6} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Males" number={summaryData.male ?? 1} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Females" number={summaryData.female ?? 1} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
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
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="ALL Students"
              chartData={country}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates title="Students per Faculty" subheader="(+43%) than last year" chartData={otherData} />
          </Grid>
          {/* 
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
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
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
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
