import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { useHistory } from "react-router";

const Delete = () => {
    const user=useSelector(selectUser);
    const dispatch=useDispatch();
    const history=useHistory();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const resp=await fetch("http://localhost:9000/user/delete/",{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:user.usrid})
        })
        const body=await resp.json();
        if(body.status===200){
            dispatch(logout());
            history.push("/");  
        }
    
    }


    return (  
        <button onClick={(e)=>handleSubmit(e)}>
            Delete account

        </button>
    );
}
 
export default Delete;