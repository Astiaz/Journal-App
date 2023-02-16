import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const dispatch = useDispatch();
  
  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const { email, password, onInputChange } = useForm(formData);


  const onSubmit = ( event ) => {
    event.preventDefault();

    // dispatch( startLoginWithEmailPassword({email, password}) );
  }

  const onGoogleSignIn = () => {

    dispatch( startGoogleSignIn() );
  }

  return (
      <AuthLayout title="Login">
        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="correo" 
                type="email" 
                placeholder="correo@gmail.com" 
                fullWidth
                name='email'
                value={email}
                onChange={ onInputChange }
                />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="contraseña" 
                type="password" 
                placeholder="correo@gmail.com" 
                fullWidth
                name='password'
                value={password}
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{mt: 1}} sm={12} display={ !!errorMessage ? '' : 'none'} >
              <Alert severity="error">
                  {errorMessage}
              </Alert>
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt: 1}} >
              <Grid item xs={ 12 } sm={6}>
                <Button disabled={ isCheckingAuthentication } type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={6}>
                <Button disabled={ isCheckingAuthentication } variant="contained" fullWidth onClick={ onGoogleSignIn }>
                  <Google/>
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
  )
}
