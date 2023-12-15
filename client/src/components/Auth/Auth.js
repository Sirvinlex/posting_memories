import React, {useState} from 'react';
import { Avatar, Button, Paper,Container, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import { signup, signin} from '../../actions/auth';
const initialStates = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const [formData, setFormData] = useState(initialStates);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history))
            
        }else{
            dispatch(signin(formData, history))
        }
    };
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    };
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    };

  
  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>{isSignup? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange}  half/>
   
                            </>)
                    }
                    <Input name='email' label='Email Address' handleChange={handleChange} fullWidth type='email'/>
                    <Input name='password' label='Password' handleChange={handleChange} handleShowPassword={handleShowPassword}
                     type={showPassword? 'text' : 'password'} />
                    {isSignup && <Input name='confirmPassword' label='Reapeat Password' type='password' handleChange={handleChange}/>}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignup? 'Sign Up' : 'Sign In'}
                </Button>

                
                
                
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth