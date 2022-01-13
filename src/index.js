import React from "react";
import ReactDOM from "react-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Signup";
import AddorEdit from "./Parkings/AddorEdit";
import { AuthProvider } from "./authentication/AuthContext"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from 'authentication/PrivateRoute';
import Admin from "layouts/Admin.js";
import DashboardPage from "views/Dashboard/Dashboard.js";
import "assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/update/:id" component={AddorEdit} />
        <PrivateRoute path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
