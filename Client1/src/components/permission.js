import { Paper, Table,TableContainer, TableRow ,TableCell,TableBody,TableHead,makeStyles,IconButton, Typography} from "@material-ui/core";
import {selectUser} from "../features/userSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";

const useStyles=makeStyles({
    Paper:{
        marginTop:50,
        width:900
    }
})

const Permissions = () => {
    var user=useSelector(selectUser);
    const [roles,setRoles]=useState({})
    const classes=useStyles();
    user=user.user
    console.log(user.token);
    useEffect(()=>{
        let mounted = true;
        async function  fetchData(){
            const roles= await fetch("http://localhost:9000/permissions/",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({token:user.token})
            })
            const body=await roles.json();
            if(mounted){
            setRoles(body)
            }
        }   
            fetchData()
            console.log(roles)
            return ()=>mounted=false

    },[]);

    
    return ( 
        <div>
                 <TableContainer className={classes.Paper} component={Paper}>
                     <Table>
                         <TableHead>
                             <TableRow>
                                 <TableCell><Typography variant="h5">S.no</Typography></TableCell>
                                 <TableCell><Typography variant="h5">Role name</Typography></TableCell>
                                 <TableCell><Typography variant="h5">Actions</Typography></TableCell>
                             </TableRow>
                         </TableHead>
                         <TableBody>
                             {Object.entries(roles).map(([key,values])=>(
                                 <TableRow>
                                 <TableCell>{Number(key)+1}</TableCell>
                                 <TableCell><Typography variant="h6">{values.role_name}</Typography></TableCell>
                                 <TableCell><Link to={`/permission/${values._id}`}><IconButton><EditIcon/></IconButton></Link></TableCell>
                                 </TableRow>
                             ))}
                         </TableBody>
                     </Table>

                 </TableContainer>
    
            
        </div>
     );
}
 
export default Permissions;