
import {Link} from "react-router-dom";
import Delete from "./delete";
import Events from "./events";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { Divider, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";

const useStyles=makeStyles({
    Paper:{
        marginTop:10,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:800,
        padding:20,
        textAlign:"center"
    }
})
const Home = () => {
    var user=useSelector(selectUser);
    user=user.user;
    const classes=useStyles();
    const [forms,setForms]=useState();
    useEffect(()=>{
        const fetchdata=async()=>{
        const resp=await fetch("http://localhost:9000/permissions/get-forms",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({token:user.token})
        })
        const body=await resp.json();
        setForms(body)
    }
    fetchdata()
    },[])
    console.log(forms);
    return ( 
        <div style={{marginTop:100}}>
        <Paper className={classes.Paper}>
            <Typography variant="h4">Forms</Typography>
            <Divider/>

        </Paper>
        {forms && (forms.map((form)=>(
        <Paper className={classes.Paper}>
        <Link to={`/form/${form._id}`}>
                    <Typography variant='p'>{form.form_name}</Typography>
                </Link>
                <Typography style={{paddingRight:60,paddingLeft:60}}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</Typography>
        </Paper>
            )))}

        </div>
     );
}
 
export default Home;