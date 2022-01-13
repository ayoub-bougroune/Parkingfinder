import React from "react"
import { Route, Redirect, useHistory } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  const history = useHistory();
  if(!currentUser)
    history.push('/login');
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
