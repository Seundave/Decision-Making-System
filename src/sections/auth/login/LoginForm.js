import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext, useAuthContext } from '../../../routes';
// import {userContext} from "../../../routes"
// import { userContext } from 'src/routes';
// import userContext from 'routes.js'
// components
import Iconify from '../../../components/iconify';
import axios from 'axios';
import { urls } from 'src/layouts/dashboard/nav/config';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser, currentUser } = useAuthContext();

  const loginSchema = yup.object().shape({
    email: yup.string().email('Enter a valid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  console.log({ setCurrentUser, currentUser });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (data) => {
    console.log({ data, urls });
    const user = await axios.post(`${urls}/user/signin`, {
      email: data.email,
      password: data.password,
    });
    console.log({ user });

    if (user.status === 201) {
      localStorage.setItem('userDetails', JSON.stringify(user.data));
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/dashboard', { replace: true });
    } else {
      // setLoginError('Invalid password.');
      toast.error('Invalid password/ username', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleClick)}>
        <Stack spacing={3}>
          <TextField
            {...register('email')}
            error={!!errors.email}
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors?.email && errors?.email?.message}
          />

          <TextField
            {...register('password')}
            name="password"
            label="Password"
            value={password}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        {/* {loginError && <p>{loginError}</p>} */}

        <LoadingButton type="submit" fullWidth size="large" variant="contained">
          Login
        </LoadingButton>
        <ToastContainer />
      </form>
    </>
  );
}
