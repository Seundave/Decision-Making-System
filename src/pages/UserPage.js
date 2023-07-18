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
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import axios from 'axios';

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
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    role: 'superrole',
    email: '',
    password: '',
    status: '',
  });

  const [USERLIST, setUSERLIST] = useState([]);

  useEffect(() => {
    // setUSERLIST(userData);
    getUserList();
  }, []);

  const getUserList = async () => {
    const authToken = localStorage.getItem('authToken');
    const response = await axios.get(`https://items-7vpt.onrender.com/api/student/users`, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
    console.log({ response });
    if (response.data.status) {
      setUSERLIST(response.data.user);
    }
  };

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [selectedSecond, setSelectedSecond] = useState({});

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const deleteUser = async () => {
    console.log({ selectedSecond });
    const authToken = localStorage.getItem('authToken');
    setOpen(null);
    const response = await axios.delete(
      `https://items-7vpt.onrender.com/api/student/delete/user`,
      { data: { email: selectedSecond.email } },
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.data.status) {
      getUserList();
    }
  };

  const handleOpenMenu = (event, selectedSecond) => {
    setOpen(event.currentTarget);
    setSelectedSecond(selectedSecond);
  };

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(`https://items-7vpt.onrender.com/api/student/create/admin`, formData);
    setUSERLIST(response.data.user);
    if (response.data.status) {
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
            User
          </Typography>
          <Button variant="contained" onClick={handleClickNewUser} startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
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
                    const { email, role, name } = row;
                    const selectedUser = selected.indexOf(email) !== -1;

                    return (
                      <TableRow hover key={email} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, email)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={''} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
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
                            onClick={(e) => handleOpenMenu(e, { email, name, role })}
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
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="role-group">
                    <label htmlFor="role">Role:</label>
                    <select
                      id="role"
                      name="role"
                      value={formData.value}
                      className="select-form"
                      onChange={handleInputChange}
                      required
                    >
                      {Object.keys(roles).map((role) => {
                        return <option key={roles[role]} value={roles[role]}>{roles[role]}</option>;
                      })}
                    </select>
                  </div>

                  {/* <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <input type="text" id="department" name="department" value={formData.department} onChange={handleInputChange} required />
                  </div> */}

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
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
