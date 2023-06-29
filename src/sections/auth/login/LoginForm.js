import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import  { useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import *  as  yup  from "yup"
import { AuthContext } from '../../../routes';
// import {userContext} from "../../../routes"
// import { userContext } from 'src/routes';
// import userContext from 'routes.js'
// components
import Iconify from '../../../components/iconify';




// ----------------------------------------------------------------------

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginSchema = yup.object().shape({
      email: yup.string().email("Enter a valid email address").required("Email is required"),
      password: yup.string().required("Password is required")
  })
  
  const {handleSubmit, register, formState: {errors}} = useForm({
    resolver: yupResolver(loginSchema)
  })
 
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { loginError } = useContext(AuthContext);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   handleLogin(email, password);

  // };

 



  const handleClick = (data) => {

    const user = users.find(user => user.email === data.email);

    if (!user) {
      alert('User not found.');
      return;
    }
    // checkInputs()
    // if (handleLogin(email, password)){
      
    //   navigate('/dashboard', { replace: true });
    // }
    if (user && user.password === data.password) {
      // setCurrentUser(user);
      navigate('/dashboard', { replace: true });
      // setLoginError(null);
      // console.log('Login successful!');
      // console.log(user)
    } else {
      // setLoginError('Invalid password.');
      alert(' Invalid password')
    }
    
  };

  const users = [
    { email: 'vc@gmail.com', role: 'VC', password: 'vpassword' },
    { email: 'director@gmail.com', role: 'director', password: 'dpassword' },
    { email: 'government@gmail.com', role: 'government', password: 'gpassword' },
    // Add more users here as needed
  ];

  

  return (
    <>
     <form onSubmit={handleSubmit(handleClick)}>   
      <Stack spacing={3}>
           
          
          <TextField  {...register("email")} error={!!errors.email}  label="Email address" value={email} onChange={e => setEmail(e.target.value)}  helperText={errors?.email && errors?.email?.message}/>

        <TextField
        {...register("password")}
          name="password"
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={e => setPassword(e.target.value)}
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

      {loginError && <p>{loginError}</p>}

      <LoadingButton type="submit" fullWidth size="large" variant="contained">
        Login
      </LoadingButton>
      </form>
    </>
  );
}
