import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Container, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import { useReducer, useState } from 'react';
import globalStyles from '../../../../constants/globalStyles';
import { actionTypes, authFormReducer, initialState } from '../../reducers/authFormReducer';
import { registerWithEmailAndPassword } from '../../authActions/firebase/registerWithEmailAndPassword';
import store from 'src/store/store';

export const Register = () => {
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useReducer(authFormReducer, initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(prevState => !prevState);

    const registerUser = async (e: React.SyntheticEvent) =>{
        e.preventDefault();
        console.log(state)
        try {
            store.dispatch(registerWithEmailAndPassword({
                email: state.email.value,
                password: state.password.value,
            }))
          } catch (err) {
            console.error(err);
          }
    }

    return (
        <Card sx={ {...globalStyles.card, textAlign: 'center'} }>
            <Container maxWidth='xs' >
                <Typography variant='h2' sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                    Register
                </Typography>
            </Container>
            <CardContent style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    component='form'
                    onSubmit={registerUser}
                    sx={{
                        '& .MuiTextField-root': { width: '25ch' },
                    }}
                    autoComplete='off'
                >
                    <div>
                        <TextField
                            required
                            id='outlined-required'
                            label='First Name'
                            style={globalStyles.textField}
                            autoComplete={'given-name'}
                            value={state.firstName.value}
                            error={!state.firstName.valid}
                            helperText={state.firstName.error}
                            disabled={loading}
                            onChange={(event) =>
                                dispatch({ type: actionTypes.FIRSTNAME, payload: event.target.value })
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id='outlined-required'
                            label='Last Name'
                            disabled={loading}
                            style={globalStyles.textField}
                            autoComplete={'family-name'}
                            value={state.lastName.value}
                            error={!state.lastName.valid}
                            helperText={state.lastName.error}
                            onChange={(event) =>
                                dispatch({ type: actionTypes.LASTNAME, payload: event.target.value })
                            }
                        />
                    </div>
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
                            Register
                        </Button>
                    </CardActions>
                </Box>
            </CardContent>
        </Card>
    );
};


