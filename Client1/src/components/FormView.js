import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectUser } from "../features/userSlice";
import {useState,useEffect} from "react";
import { Paper,makeStyles, Typography, TextField,FormControlLabel,Checkbox,InputLabel,FormControl,Select,MenuItem,OutlinedInput,InputAdornment} from "@material-ui/core";

const useStyles=makeStyles({
    Paper:{
        marginTop:100,
        width:800,
        display:"flex",
        flexDirection:"column",
        padding:50
    },
    TextField:{
        marginTop:12
    },
    btn:{
        marginTop:10
    }
})

const FormView = () => {
    const {id}=useParams();
    var user=useSelector(selectUser);
    const classes=useStyles();
    user=user.user;
    const [formVals,setFormVals]=useState({});
    const[form,setForm]=useState({});
    var hi=false
    useEffect(()=>{
        const fetchdata=async()=>{
            const resp=await fetch("http://localhost:9000/permissions/get-form",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id:id,token:user.token})
            })
            const body=await resp.json();
            setFormVals(body)
        }
        fetchdata()
    },[])    

    console.log(formVals);
    
    if(formVals!==null && formVals.hasOwnProperty("components")){
        hi=true

    }
    const handleChange=(e)=>{
        console.log(e.target)
        console.log({[e.target.name]:e.target.value})
        if(e.target.checked){
            setForm({ ...form ,[e.target.name]:e.target.checked})

        }else{
            setForm({ ...form ,[e.target.name]:e.target.value})

        }
        console.log(form);

    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(form);


    }
    console.log(form);
    return ( 
        <div>
            <Paper className={classes.Paper}>
            {hi && (
                <>
                <Typography variant="h3" align="center">{formVals.form_name}</Typography>
                {formVals.components.map(comp=>(
                    <>
                    {comp.type==="textfield" && (
                        <>
                        <TextField
                        variant="outlined"
                        className={classes.TextField}
                        type={comp.type}
                        name={comp.label}
                        onChange={e=>handleChange(e)}
                        value={form[comp.label]}
                        label={comp.label} />
                        </>
                        
                    )}
                    {comp.type==="textarea" &&(
                        <TextField  
                        variant="outlined" 
                        type={comp.type} 
                        className={classes.TextField}
                        label={comp.label}
                        name={comp.label}
                        onChange={e=>handleChange(e)}
                        value={form[comp.label]}
                        multiline
                        maxRows={4}/>
                    )}
                    {comp.type==="number" && (
                        <TextField type={comp.type}
                        label={comp.label}
                        className={classes.TextField}
                        variant="outlined"
                        name={comp.label}
                        onChange={e=>handleChange(e)}
                        value={form[comp.label]}
                        label={comp.label}/>
                    )}
                    {comp.type==="button" && (
                        <button className={classes.btn} onClick={e=>handleSubmit(e)}>{comp.label}</button>
                    )}
                    {comp.type==="checkbox" &&(
                              <FormControlLabel
                              control={
                                <Checkbox
                                  name={comp.label}
                                  onChange={e=>handleChange(e)}
                                  value={form[comp.label]}
                                  color="primary"
                                />
                              }
                              label={comp.label}
                            />
                    )  
                    }
                    {comp.type=="select" && (
                              <FormControl variant="outlined" className={classes.TextField}>
                              <InputLabel id="demo-simple-select-outlined-label">{comp.label}</InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={hi}
                                onChange={e=>handleChange(e)}
                                value={form[comp.label]}
                                name={comp.label}

                                >
                                  {comp.values.map(v=>(
                                        <MenuItem value={v.value}>{v.label}</MenuItem>
                                  ))
                                    }
                              </Select>
                            </FormControl>
                    )}
                    {comp.type==="currency" && (
                               <FormControl fullWidth className={classes.TextField} variant="outlined">
                               <InputLabel htmlFor="outlined-adornment-amount">{comp.label}</InputLabel>
                               <OutlinedInput
                                 id="outlined-adornment-amount"
                                 startAdornment={<InputAdornment position="start">{comp.currency}</InputAdornment>}
                                 labelWidth={60}
                               />
                             </FormControl>
                    )}
                    </>
                ))}
                </>
            )}
            </Paper>

        </div>
     );
}
 
export default FormView;