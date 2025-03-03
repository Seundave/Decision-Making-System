import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../user.css';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import axios from 'axios';
import { urls } from 'src/layouts/dashboard/nav/config';
import { useAuthContext } from 'src/routes';
import { Select as Selected } from '@material-ui/core';
import CustomSelectDropdown from 'src/utils/CustomSelectDropdown';
import FacultyDepartmentDropdown from 'src/utils/FacultyDepartmentDropdown';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  // { id: 'password', label: 'Password', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    department: '',
    role: 'superrole',
    email: '',
    password: '',
    lastName: '',
    accessLevel: '',
  });

  const [USERLIST, setUSERLIST] = useState([]);

  useEffect(() => {
    // setUSERLIST(userData);

    const data = localStorage.getItem('userDetails');

    if (data) {
      setUser(JSON.parse(data));
    }
    getUserList();
  }, []);

  const getUserList = async () => {
    const data = localStorage.getItem('userDetails');
    const response = await axios.get(`${urls}/user/users`, {
      // headers: {
      //   authorization: `Bearer ${JSON.parse(data).token}`,
      // },
    });

    setUSERLIST(response.data);
  };

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');
  const [access, setAccess] = useState('');

  const [filterName, setFilterName] = useState('');
  const [selectedSecond, setSelectedSecond] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const deleteUser = async () => {
    const authToken = localStorage.getItem('authToken');
    setOpen(null);
    const response = await axios.delete(
      `${urls}/api/student/delete/user`,
      { data: { email: selectedSecond.email } },
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log({ response });
    if (response.data.status) {
      getUserList();
    }
  };

  const handleOpenMenu = (event, selectedSecond) => {
    setOpen(event.currentTarget);
    setSelectedSecond(selectedSecond);
  };
  useEffect(() => {
    if (formData.role === roles.deans) {
      setFormData({ ...formData, status: 'faculty' });
    } else if (formData.role === roles.hod) {
      setFormData({ ...formData, status: 'department' });
    } else {
      setFormData({ ...formData, status: 'all' });
    }
  }, [formData.role]);
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const roles = {
    superrole: 'Superrole',
    principal: 'Principal',
    director: 'Director',
    deans: 'Deans',
    hod: 'HOD',
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleClickNewUser = () => {
    setShowPopup(true);
  };
  const getNeededData = async () => {
    const user = JSON.parse(localStorage.getItem('userDetails'));

    const response = await axios.get(`${urls}/user/users`, {
      // headers: {
      //   authorization: `Bearer ${user.token}`,
      // },
    });
    console.log({ response });
    // setFaculties(response.data.faculty);
    // setDepartments(response.data.departments);
  };
  useEffect(() => {
    getNeededData();
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value, roles });
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedDepartment) {
      formData.department = selectedDepartment.name;
      formData.accessLevel = selectedDepartment.name;
    }
    console.log({ formData });
    const response = await axios.post(`${urls}/user/signup`, formData);
    console.log({ response }, 'create');

    if (response.data.status === false) {
      alert('Username/password already exists');
      // toast.error('Username/password already exists', {
      //   position: 'top-right',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    } else {
      setUSERLIST(response.data.user);
      toast.success('User created successful!');
      setShowPopup(false);
    }

    // console.log('Form data stored:', formData);

    // USERLIST.push(formData);
    // setShowPopup(false);

    // setFormData('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSelect = (option, value) => {
    console.log('Selected option:', option, value);
    setFormData({ ...formData, status: value, accessLevel: option.name });
    // Perform any other actions you want when an option is selected
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  console.log({ emptyRows, filteredUsers, isNotFound });

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Hi, {user.name}
          </Typography>
          {/* {user.role === 'superrole' && ( */}
          <Button variant="contained" onClick={handleClickNewUser} startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
          {/* )} */}
        </Stack>

        <Card className={`form-container ${showPopup ? 'opacity-reduced' : ''}`}>
          <UserListToolbar
            userList={USERLIST}
            setUSERLIST={setUSERLIST}
            selectedUser={selected}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // const { id, name, role, status, department, email, password, avatarUrl } = row;
                    const { email, role, firstName, lastName } = row;
                    console.log({ email, role, firstName, lastName });
                    const selectedUser = selected.indexOf(email) !== -1;

                    return (
                      <TableRow hover key={email} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, email)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={firstName} src={''} />
                            <Typography variant="subtitle2" noWrap>
                              {firstName} {lastName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        {/* <TableCell align="left">{department}</TableCell> */}

                        {/* <TableCell align="left">{company}</TableCell> */}

                        <TableCell align="left">{role}</TableCell>

                        {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(e) => handleOpenMenu(e, { email, firstName, role })}
                          >
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {showPopup && (
            <div className="user-popup">
              <div className="user-form">
                <h1>Create a user </h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">First Name:</label>
                    <TextField
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      fullWidth
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="LastName">Last Name:</label>
                    <TextField
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      fullWidth
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Box>
                    <div className="role-group">
                      <label htmlFor="role">Role:</label>
                      <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                          id="Role"
                          name="role"
                          label="Role"
                          labelId="demo-simple-select-label"
                          value={formData.value}
                          onChange={handleInputChange}
                        >
                          {Object.keys(roles).map((role) => {
                            return (
                              <MenuItem key={roles[roles]} value={roles[role]}>
                                {roles[role]}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    {formData.role === roles.deans && (
                      <div className="role-group">
                        <label htmlFor="faculty">Faculty:</label>
                        <CustomSelectDropdown
                          selected={formData.accessLevel}
                          options={faculties}
                          onSelect={(value) => handleSelect(value, 'faculty')}
                        />
                      </div>
                    )}
                    {formData.role === roles.hod && (
                      <div className="role-group">
                        <label htmlFor="department">Department:</label>
                        <FacultyDepartmentDropdown
                          faculties={faculties}
                          departments={departments}
                          selectedDepartment={selectedDepartment}
                          setSelectedDepartment={setSelectedDepartment}
                        />
                      </div>
                    )}
                  </Box>

                  {/* <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <input type="text" id="department" name="department" value={formData.department} onChange={handleInputChange} required />
                  </div> */}

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>

                    <TextField
                      type="email"
                      placeholder="Email"
                      name="email"
                      fullWidth
                      label="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password:</label>

                    <TextField
                      type="password"
                      placeholder="Password"
                      name="password"
                      fullWidth
                      label="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="submit-btn">
                    <button type="submit" className="newuser-button">
                      Create new user
                    </button>
                    <button className="close-button" onClick={() => setShowPopup(false)}>
                      Close
                    </button>
                  </div>
                  <ToastContainer />
                </form>
              </div>
            </div>
          )}
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={deleteUser}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
