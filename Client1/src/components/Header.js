// // import Logout from "./Logout";
// import { useSelector } from "react-redux";
// import {selectUser} from "../features/userSlice";
// import { useHistory } from "react-router";
// import { Link } from "react-router-dom";


// const Header = () => {
//     const user=useSelector(selectUser);
//     const history=useHistory();
//     const handleClick=(e)=>{
//         history.push('/login');
//     }
//     const LoginButton=()=>{
//         return (
//             <button onClick={(e)=>handleClick(e)}>Login</button>
//         )
//     }
//     return ( 
//         <div className='nav'>
//             <ul>
//                 <li><Link to="/" style={{textDecoration:"none",color:"white"}}>Home</Link></li>
//                 <li><Link to="/signup" style={{textDecoration:"none",color:"white"}}>Signup</Link></li>
//                 <li>{user?<Logout/>:<LoginButton/>}</li>
//             </ul>
//         </div>
//      );
// }
 
// export default Header;