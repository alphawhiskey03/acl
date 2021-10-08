import { Checkbox, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow ,Button} from "@material-ui/core";
import { useEffect ,useState} from "react";
import { useParams } from "react-router";
import {selectUser} from "../features/userSlice";
import { selectPermission ,update,fill} from "../features/permissionSlice";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import {store} from "../app/store";
 import {useHistory} from "react-router-dom";

const useStyles=makeStyles({
    Paper:{
        marginRight:"auto",
        marginLeft:"auto",
        marginTop:60,
        width:800,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    btn:{
     marginTop:10,
     marginBottom:10,
     marginRight:"auto",
     marginLeft:"auto",
     width:250  
    }
})
const EditPermission = () => {
    const {id}=useParams();
    const classes=useStyles();
    var user=useSelector(selectUser);
    const dispatch=useDispatch();
    const history=useHistory();
    user=user.user
    useEffect(()=>{
        fetch("http://localhost:9000/permissions/single",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:id,token:user.token})
        }).then(resp=>{
            return resp.json()
        }).then(body=>{
            console.log("hi");
            dispatch(fill({data:body}))
        })

    },[])
    const perm=useSelector(selectPermission);

    
    // if(!Array.isArray(perm) && perm && permission){

    // }
    

    const handleChange=(e,per,type)=>{
        // console.log(permission[per][type]);
        // permission[per][type]=e.target.checked;
        console.log(`is : ${e.target.checked}`);
        dispatch(update({
            sm_name:per,
            sm_type:type,
            answer:e.target.checked
        }));
    }
    
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const perm=store.getState().permission.permission;
        console.log(perm);
        const resp=await fetch("http://localhost:9000/permissions/update/",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({token:user.token,permissions:perm})
        })
        if(resp.status===201){
            alert("Succesfully updated")
            history.push("/permissions");
        }
    }

    
  

    return ( 
        <>
        <Paper className={classes.Paper}>
            <form onSubmit={e=>handleSubmit(e)}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Menu</TableCell>
                        <TableCell>Read</TableCell>
                        <TableCell>Write</TableCell>
                        <TableCell>Delete</TableCell>
                        <TableCell>Download</TableCell>  
                        <TableCell>Overall</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {perm && (
                        Object.entries(perm).map(([key,values])=>(
                            <TableRow key={key}>
                                <TableCell>{values.menu_name}</TableCell>
                                <TableCell>
                                    <Checkbox
                                    color="primary"
                                    checked={perm[`${values.menu_name}`].read}
                                    onChange={e=>{ handleChange(e,values.menu_name,"read")}}
                                     />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                     color="primary"
                                     checked={perm[`${values.menu_name}`].write}
                                     onChange={e=>{ handleChange(e,values.menu_name,"write")}}
                                     />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                     color="primary"
                                     checked={perm[`${values.menu_name}`].del}
                                     onChange={e=>{ handleChange(e,values.menu_name,"del")}}
                                     />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                     color="primary"
                                     checked={perm[`${values.menu_name}`].download}
                                     onChange={e=>{ handleChange(e,values.menu_name,"download")}}
                                     />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                     color="primary"
                                     checked={perm[`${values.menu_name}`].overall}
                                     onChange={e=>{ handleChange(e,values.menu_name,"overall")}}
                                     />
                                </TableCell>

                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <button className={classes.btn}  >Save changes</button>
            </form>
        </Paper>
        </>
     );
}
 
export default EditPermission;