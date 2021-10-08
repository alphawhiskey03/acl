import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import {useHistory} from "react-router-dom";
import { makeStyles, TextField,Paper, Typography } from "@material-ui/core";


const useStyles=makeStyles({
    TextField:{
        margin:10
    },
    Paper:{
        margin:100,
        display:"flex",
        width:300,
        justifyContent:"center",
        flexDirection:"column",
        marginRight:"auto",
        marginLeft:"auto",
        height:350
    },
    btn:{
        margin:20

    }
})

const Login = () => {
    const classes=useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError]=useState('');
    const dispatch = useDispatch();
    const user=useSelector(selectUser);
    useEffect(()=>{
        if(user && user.user.user.isAuthenticated){
            history.push("/");
        }

    },[])
    const history=useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);
        try {
            const resp = await fetch("http://localhost:9000/user/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({email: username, password: password})
            });
            const body =await resp.json();
            console.log(body);
            if(body.message){
                setError("Invalid user");
            }
            if (body.accessToken) {
                dispatch(login({
                    user:body.accessToken
                }));
                history.push("/");
            }
        } catch (e) {
            console.log(e);
        }



    }
    return (
        <Paper className={classes.Paper}>
          <Typography variant="h4" align="center">Login</Typography>
            <span>{error}</span>     
                <form onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    type="text"
                    className={classes.TextField}
                    value={username}
                    variant="outlined"
                    label="Email"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <TextField 
                className={classes.TextField}
                type="password"
                value={password}
                variant="outlined"
                label="Password"
                onChange={(e) => setPassword(e.target.value)} 
                required
                    />
                <Link to='/forgot-password' style={{fontSize:10,marginLeft:10,marginRight:"auto"}}>Forgot Password</Link>
                <button className={classes.btn} >Submit</button>
            </form>

        </Paper>
        
    );
}

export default Login;