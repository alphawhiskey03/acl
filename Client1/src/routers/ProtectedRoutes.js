import React from 'react';
import {Redirect,Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";


function ProtectedRoute({ component: Component, ...restOfProps }) {
  let user=useSelector(selectUser);
    user=user?user.user.user:'';
    console.log(user);
    var isPermitted=user.isAuthenticated;
  console.log(isPermitted);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isPermitted?
     <Component {...props} /> :<Redirect to="/login"/>
      }
    />
  );
}

export default ProtectedRoute;