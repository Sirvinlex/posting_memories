import React from 'react';
import { TextField, InputAdornment, IconButton, Grid } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
const Input = ({half, name, type, label, autoFocus, handleChange, handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth='true'
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={
                name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password'? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null
            } 
        />
    </Grid>
  )
}

export default Input;