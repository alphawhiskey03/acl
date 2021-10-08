
import {BrowserRouter as Router,Route,Switch } from "react-router-dom";
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Forgot from './components/forgot';
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";
import {Redirect} from "react-router-dom";
import Signup from "./components/signup";
import Reset from "./components/reset";
import Events from "./components/events";
import AddEvent from "./components/addEvent";
import {createTheme,ThemeProvider} from "@material-ui/core";
import ProtectedRoute from "./routers/ProtectedRoutes";
import AdminRoute from "./routers/adminRoute";
import NewUser from "./components/newUser";
import Permissions from "./components/permission";
import EditPermission from "./components/editPermission";
import CreateForm from "./components/formBuilder";
import FormView from "./components/FormView";
import ChangePassword from "./components/change-password";


const theme=createTheme({
  palette:{
    primary:{
      main:"#424242",
    },
    secondary:{
      main:"#cfd8dc",
    },
    overrides: {
      MuiButton: {
        primary: {
          color: 'white',
        },
      },
    }
  },
  typography:{
    fontSize:18
  }

})

function App() {
  const user=useSelector(selectUser);
  return (
    <Router>
    <Switch>
    <AdminRoute  path="/create-form" component={CreateForm}/>
    <ThemeProvider theme={theme}>
    <Route path="/login">
          <Login log="log"/>
       </Route>
       <Route path="/signup">
         <Signup/>
       </Route>
       <Layout>
       <Route path="/change-password">
         {user?  <ChangePassword/>:<Redirect to="/login"/>}    
       </Route>
       <Route path="/forgot-password">
          <Forgot/>
       </Route>
       <Route path="/reset-password/:id/:token">
         <Reset/>
       </Route>
       <Route path="/events">
       {user?  <Events/>:<Redirect to="/login"/>}    
       </Route>
       <Route path="/add-event">
       {user?  <AddEvent/>:<Redirect to="/login"/>}    
       </Route>
       <ProtectedRoute exact path="/" component={Home}/>
       <ProtectedRoute exact path="/form/:id" component={FormView}/>
       <AdminRoute exact path="/new-user" component={NewUser}/>
       <AdminRoute exact path='/permissions' component={Permissions}/>
       <AdminRoute exact path="/permission/:id" component={EditPermission}/>
       </Layout>
    </ThemeProvider>
    </Switch>
    </Router>
  );
}



export default App;
