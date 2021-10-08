import Header from "./Header";
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import {List ,ListItem,ListItemText,ListItemIcon,Divider,Typography,AppBar,Toolbar} from '@material-ui/core';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Navbar from "./navbar";


const useStyles=makeStyles((theme)=>({
    root:{
        display:'flex'
    },
    child:{
        marginTop:50,
        marginLeft:"auto",
        marginRight:"auto"
    }
}
)
)



const Layout = ({children,log}) => {
    const classes=useStyles();
    console.log(children);


    return ( 
        <div className={classes.root}>
            <Navbar/>
            <div className={classes.child}>
            {children}
            </div>
        </div>
     );
}
 
export default Layout;