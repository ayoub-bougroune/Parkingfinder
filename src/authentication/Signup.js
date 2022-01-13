import React from "react";
import { Link, useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "./AuthContext";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

const styles = {
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  card: {
    marginTop: "50px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function LogIn() {
  const classes = useStyles();
  const [userName, setuserName] = React.useState('test');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState({success: true, message:''})
  const history = useHistory()
  const { signup } = useAuth()
  const handlRegister = () => {
    if(password !== confirmPassword){
      setError({success: false, message: 'passwords are not the same'});
      return;
    }
    signup(userName, password).then((response) =>{
      //history.push("/")
      setError({success: true, message: "user created with success"});
    }).catch((err) => {
      setError({success: false, message: err.message});
    })
  }
  return (
    <div className={classes.wrapper}  className={classes.card}>
    <GridContainer justify="center" >
        <GridItem xs={12} sm={12} md={4}>
          <Card >
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Register</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              { error.message !== '' && (
                <SnackbarContent
                  message={
                    error.message
                  }
                  close
                  color={error.success? "success" :"danger"}
                />
              )}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                      defaultValue:userName,
                      required: true,
                      onChange:(event) => setuserName(event.target.value)
                    }}
                    
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                      defaultValue:password,
                      onChange:(event) => setPassword(event.target.value)
                    }}
                    inputProps= {{
                      type: "password",
                    }}
                    
                  />
                </GridItem>
                
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Confirm Password"
                    id="cpassword"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                      defaultValue:confirmPassword,
                      onChange:(event) => setConfirmPassword(event.target.value)
                    }}
                    inputProps= {{
                      type: "password",
                    }}
                    
                  />
                </GridItem>
                
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handlRegister}>Register</Button>
              Already have an account? <Link to="/login">Log In</Link>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
  )
}
