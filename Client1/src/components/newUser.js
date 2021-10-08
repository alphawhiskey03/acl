import {makeStyles,Paper,TextField,Select,InputLabel,MenuItem,FormControl,Button} from "@material-ui/core";
import {useState} from 'react';
import {selectUser} from "../features/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const useStyle=makeStyles({
    paper:{
        marginTop:30,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        width:400,
        display:"flex",
        justifyContent:"center",
        flexDirection:"column"

    },
    TextField:{
        margin:10
    },
    btn:{
        // marginRight:"auto",
        marginLeft:"auto",
        margin:10,
        height:40,
    }
})


const NewUser = () => {
    var user=useSelector(selectUser);
     user=user.user.user;
    console.log(user);
    const classes=useStyle();
    const history=useHistory();
    const [role,setRole]=useState({});
    const [fname,setFname]=useState('');
    const [lname,setLname]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [location,setLocation]=useState('');
    const RoleHandle=(e)=>{
        const roleObj= {
            "61431d1eb46e70443609e27d":"admin",
            "61431d30b46e70443609e27f":"project-manager",
            "61431d46b46e70443609e281":"user"  
        }
        setRole({name:`${roleObj['role_id']}`,role_id:`${e.target.value}`});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log({fname,lname,email,password,role_id:role,created_by:user.email,location_id:location});
        const resp= await fetch("http://localhost:9000/user/create/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fname,lname,email,password,role_id:role.role_id,role_name:role.name,created_by:user.email,location_id:location})
        })
        const body=resp.json();
      
        if(resp.status===201){
            alert("User created successfully")
            history.push("/");
        }

    }
    return ( 
        <div>
            <Paper className={classes.paper}>
                <form onSubmit={e=>{handleSubmit(e)}}>
                <TextField 
                variant="outlined" 
                className={classes.TextField} 
                label='First name'
                value={fname}
                onChange={e=>{setFname(e.target.value)}}/>
                <TextField 
                variant="outlined" 
                className={classes.TextField} 
                label='Last name'
                value={lname}
                onChange={e=>{setLname(e.target.value)}}
                />
                <TextField
                variant="outlined"
                className={classes.TextField}
                label='Email'
                value={email}
                onChange={e=>{setEmail(e.target.value)}}
                />
                <TextField 
                variant="outlined"
                className={classes.TextField} 
                label='Password'
                value={password}
                onChange={e=>{setPassword(e.target.value)}}
                />
                <FormControl variant="outlined" className={classes.TextField}>
                <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={role.name}
                onChange={(e)=>RoleHandle(e)}
                label="Role"
                >
                <MenuItem value={"61431d1eb46e70443609e27d"}>Admin</MenuItem>
                <MenuItem value={"61431d30b46e70443609e27f"}>Project manager</MenuItem>
                <MenuItem value={"61431d46b46e70443609e281"}>User</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.TextField}>
                <InputLabel id="demo-simple-select-outlined-label"> Location</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                label="Location"
                >
                <MenuItem value={"61431d1eb46e70443609e27d"}>Coimbatore</MenuItem>
                <MenuItem value={"61431d30b46e70443609e27f"}>Texas</MenuItem>
                <MenuItem value={"61431d46b46e70443609e281"}>Hydrabad</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" className={classes.btn} type="submit">Submit</Button>
                
      </form>
    

            </Paper>
        </div>
     );
}
 
export default NewUser;