import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import {List ,ListItem,ListItemText,ListItemIcon,Divider,Typography,AppBar,Toolbar} from '@material-ui/core';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../features/userSlice";
const drawerWidth = 240;

const useStyles=makeStyles((theme)=>({
    root:{
        display:'flex'
    },
    drawer:{
        width:drawerWidth,

    },
    drawerPaper:{
        width:drawerWidth
    },
    head:{
        flex:1,
         textAlign:"right"
    },
    listitem:{
        cursor:"pointer"
    }
}
)
)


const Navbar = () => {
    const classes=useStyles();
    const user=useSelector(selectUser);
    const dispatch =useDispatch();
    const access=user?user.user.applicationAccess:'';
    const history=useHistory();
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    if(access){
    Object.entries(access.menus).forEach(([key,value])=>{
        console.log(key,value);
    })
}
    const handleMenuClick=(e,value)=>{
        if(value.url!=="none"){
        history.push(value.menu_url);
        }
    }
        const logoutButton=(e)=>{
            dispatch(logout());
            history.push('/login')
        }
    
    
    return (
        <div>
          {user && (<div> <AppBar position="fixed" className={classes.root}>
                <Toolbar>
                    <Typography variant="h5" className={classes.head}>
                        APP
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer 
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            color="secondary"
            classes={{paper:classes.drawerPaper}}>
                <List>
                <ListItem className={classes.listitem} onClick={(e)=>{history.push("/")}}>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                    <Divider/>
                    {access && (Object.entries(access.menus).map(([key,value])=>(
                        <div>
                        {value.overall && (
                            <div>
                        <ListItem className={classes.listitem}  onClick={(e)=>{handleMenuClick(e,value)}}> 
                        <ListItemText primary={value.menu_name.capitalize()}/>
                        </ListItem>
                        <Divider/>
                        </div>
                        )}
                        </div>
                        
                     ) ))}
                    <ListItem className={classes.listitem} onClick={(e)=>{logoutButton()}}>
                        <ListItemText primary={"Logout"}/>
                    </ListItem>
                </List>
            </Drawer></div>)
            }
        </div>
      );
}
 
export default Navbar;