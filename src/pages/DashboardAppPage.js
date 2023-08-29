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
    graduated: 0,
    students: 0,
    dlc: 0,
    pg: 0,
    undergraduate: 0,
  });
  const [otherData, setOtherData] = useState([
    { label: 'Graduated', value: 0 },
    { label: 'Undergraduate', value: 0 },
    { label: 'PG', value: 0 },
    { label: 'DLC', value: 0 },
  ]);
  const [user, setUser] = useState({});
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/student/get/summaryData'); // Replace with your API endpoint

      if (response.status === 200) {
        const jsonData = await response.json();
        console.log({ jsonData }); // Check the structure of jsonData

        // Assuming jsonData.results has the structure you mentioned
        setSummaryData({
          students: jsonData.results.students.length,
          graduated: jsonData.results.graduated.length,
          dlc: jsonData.results.dlc.length,
          pg: jsonData.results.pg.length,
          undergraduate: jsonData.results.undergraduate.length,
        });
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
        console.log(jsonData.studentDeparment);
        const result = Object.entries(jsonData.studentDeparment).map(([departmentName, departmentInfo]) => {
          return { label: departmentName, value: departmentInfo.students.length };
        });

        console.log(result);
        // setSummaryData(jsonData.studentDeparment);
        setOtherData(result);
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchInfo();
    const data = localStorage.getItem('userDetails');

    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);
  console.log({ currentUser });

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi {user?.name}, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of students" number={summaryData.students ?? 6} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Graduates" number={summaryData.graduated ?? 1} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of undergraduates" number={summaryData.undergraduate ?? 1} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Number of Postgraduates" number={summaryData.pg ?? 1} />
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
              title="ALl Students"
              chartData={[
                { label: 'Post Graduates', value: summaryData.pg ?? 3 },
                { label: 'Distanc learning centre', value: summaryData.dlc ?? 4 },
                { label: 'Graduate', value: summaryData.graduated ?? 4 },
                { label: 'Under Graduate', value: summaryData.undergraduate ?? 3 },
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
              title="Students per Department"
              subheader="(+43%) than last year"
              chartData={otherData}
            />
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
