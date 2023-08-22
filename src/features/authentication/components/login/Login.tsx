import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Container, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import store from 'src/store/store';
import { IUserSlice } from 'src/store/user/userSlice.contracts';
import { NetworkStatusEnums } from 'src/utils/enums/networkSTatusEnums';
import globalStyles from '../../../../utils/constants/globalStyles';
import { useAuth } from '../../context/AuthContext';
import { actionTypes, initialState, loginFormReducer } from '../../reducers/loginFormReducer';

export const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(loginFormReducer, initialState);
    const [showPassword, setShowPassword] = useState(false);
    const authService = useAuth();

    const handleClickShowPassword = () => setShowPassword(prevState => !prevState);

    const isAuthenticated =
    NetworkStatusEnums.SUCCESS ===
    useSelector((state: IUserSlice) => state.user.status);

    useEffect(() => {
        if (isAuthenticated) {
          navigate('/');
        }
      }, [isAuthenticated]);

    const loginUser = async (e: React.SyntheticEvent) =>{
        e.preventDefault();
        try {
            store.dispatch(authService.signInWithEmailAndPassword(state.email.value, state.password.value))
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Card sx={ {...globalStyles.card, textAlign: 'center'} }>
            <Container maxWidth='xs' >
                <Typography variant='h2' sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                    Login
                </Typography>
            </Container>
            <CardContent style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    component='form'
                    onSubmit={loginUser}
                    sx={{
                        '& .MuiTextField-root': { width: '25ch' },
                    }}
                    noValidate
                    autoComplete='off'
                >
                    <div>
                        <TextField
                            required
                            id='outlined-required'
                            label='Email'
                            disabled={loading}
                            style={globalStyles.textField}
                            autoComplete={'email'}
                            value={state.email.value}
                            error={!state.email.valid}
                            helperText={state.email.error}
                            onChange={(event) => dispatch({ type: actionTypes.EMAIL, payload: event.target.value })}
                        />
                    </div>
                    <div>
                        <TextField
                            id='outlined-password-input'
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            disabled={loading}
                            style={globalStyles.textField}
                            autoComplete='current-password'
                            error={!state.password.valid}
                            helperText={state.password.error}
                            value={state.password.value}
                            onChange={(event) =>
                                dispatch({ type: actionTypes.PASSWORD, payload: event.target.value })
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title={showPassword ? 'Hide Password' : 'Show Password'}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleClickShowPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <CardActions sx={{justifyContent:'center'}}>
                        <Button variant='outlined' type="submit">
                            Login
                        </Button>
                    </CardActions>
                </Box>
            </CardContent>
        </Card>
    );
};


