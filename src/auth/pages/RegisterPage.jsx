import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { creatingUserWithEmailPassword } from "../../store/auth";

const formData ={ 
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'Introduce un correo válido'],
  password: [(value) => value.length >= 6, 'La contrasena debe tener mas de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth);
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,   
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;
    
    dispatch(creatingUserWithEmailPassword(formState));

  }

  return (
      <AuthLayout title="Registro">
        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Nombre Completo" 
                type="text" 
                placeholder="Alfonzo"
                fullWidth
                name='displayName'
                value={ displayName }
                onChange= { onInputChange }
                error = { !!displayNameValid && formSubmitted}
                helperText= { displayNameValid }
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@gmail.com" 
                fullWidth
                name='email'
                value= {email}
                onChange= { onInputChange }
                error = { !!emailValid  && formSubmitted}
                helperText= { emailValid }
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="************"
                fullWidth
                name='password'
                value= {password}
                onChange= { onInputChange }
                error = { !!passwordValid  && formSubmitted}
                helperText= { passwordValid }
              />
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt: 1}} >
              <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none'}>
                <Alert severity="error">
                  { errorMessage }
                </Alert>
              </Grid>
              <Grid item xs={ 12 }>
                <Button disabled={ isCheckingAuthentication } type='submit' variant="contained" fullWidth>
                  Crear Cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ¿Ya tienes una cuenta?
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
  )
}
