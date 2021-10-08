
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { useHistory } from "react-router-dom";
import { removeAll } from "../features/eventSlice";

const Logout = () => {
    const dispatch =useDispatch();
    const history=useHistory();
    const handleClick=(e)=>{
        dispatch(removeAll());
        dispatch(logout());
        history.push('/login')
    }
    return ( 
        <>
        logout
        </>
     );
}
 
export default Logout;
