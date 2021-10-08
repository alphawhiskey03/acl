import { Paper,makeStyles,AppBar, TextField } from "@material-ui/core";
import { FormBuilder } from "react-formio/lib/components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useHistory } from "react-router-dom";

const useStyles=makeStyles({
  Appbar:{
    padding:20,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  els:{
    margin:10
  }
})

const CreateForm = () => {
  const [nws,setNws]=useState(false);
  const [formName,setFormName]=useState('');
  const classes=useStyles();
  const history=useHistory();
  var user=useSelector(selectUser);
  user=user.user;
  var mod;
  const handleSubmit=async(d)=>{
    var data={
      form_name:"",
      components:[]
    };
    data.form_name=formName;
    mod.forEach(m=>{
      let dat={
        id:m.id,
        label:m.label,
        type:m.type,
        placeholder:m.placeholder,
        currency:m.currency,
      }
      if(m.hasOwnProperty('data')){
        if(m.data.hasOwnProperty('values')){
          dat['values']=m.data.values
        }
      }
      data.components.push(dat);
      
    })
    console.log(data);
    try{
    if(data.components.length<2){
      throw new Error("There are no input elements present!")
    }
    if(data.form_name.length<1){
      throw new Error("Fill in the form name!")
    }
      const resp=await fetch("http://localhost:9000/permissions/add-form",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({token:user.token,data:data})
      })
      if(resp.status!==201){
        throw new Error("Something went wrong")
      }
      history.push("/");
    }catch(err){
      alert(err);
      

    }
  
  }
  const handleChange=(schema)=>{
    mod=schema.components;
  }
    return (  
        <div className="builderClass">
          <div className={classes.Appbar}>
            <TextField variant="outlined" className={classes.els} color="primary" label="Form name" value={formName} onChange={e=>setFormName(e.target.value)}/>
            <button className={classes.els} onClick={e=>handleSubmit(e)}>Save Form</button>
          </div>

        <FormBuilder
        style={{marginTop:100}}
               options={{
                builder: {
                  layout: false,
                  premium: false,
                  basic: {
                    default: true,
                    components: {
                      password: true,
                      radio: false,
                      button: false,
                      selectboxes:false
                    }
                  },
                  advanced: {
                    default: true,
                    components: {
                      signature: false,
                      phoneNumber:false,
                      survey:false,
                      address:false,
                      url:false,
                      tags:false,
                      day:false
                    }
                  },
                }
              }}
         form={{display: 'form'}}
         onChange={schema=>{console.log(schema);handleChange(schema)}}/>
        </div>
    );
}
 
export default CreateForm;