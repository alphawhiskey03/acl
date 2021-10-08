import {useState} from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useHistory } from 'react-router';
import { Divider, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles=makeStyles({
    Paper:{
        marginTop:60,
        width:250,
        padding:10,
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        alignItems:"center"
    },
    TextField:{
        margin:10
    }

})


const ChangePassword = () => {
    const[password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const[error,setError]=useState('');
    const user=useSelector(selectUser);
    const history=useHistory();
    const classes=useStyles();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(user);
        if(password===confirmPassword){
        try{
            // console.log(pass);
        const resp= await fetch("http://localhost:9000/user/update-user",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userID:user.usrid,password:password,token:user.token})
            
        })
        const body=await resp.json();
        console.log(body.status);
        if(body.status===200){
            alert("succesfully updated");
            history.push("/");
        }else{
            throw new Error("Something went wrong");
        }
        }catch(err){
            setError("Something went wrong")
            console.log(err);
        }
    }else{
        setError("Passwords dont match!")
    }

    }
    return (
        <Paper className={classes.Paper}>
            <Typography variant="h4">Change password</Typography>
            <Divider/>
            <form onSubmit={e=>handleSubmit(e)}>
                <TextField type='text' 
                variant="outlined"
                label="Password"
                className={classes.TextField}
                value={password}
                onChange={e=>setPassword(e.target.value)}/>

                 <TextField type="text"
                               variant="outlined"
                               label="Confirm Password"
                               className={classes.TextField}
                 value={confirmPassword}
                 onChange={e=>setConfirmPassword(e.target.value)}
                 />  
                
                <button style={{width:100,marginLeft:"auto"}}>Submit</button>
            </form>
        </Paper>
      );
}
 
export default ChangePassword;