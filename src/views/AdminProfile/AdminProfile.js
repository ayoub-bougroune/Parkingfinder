import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "authentication/AuthContext";
import InputLabel from "@material-ui/core/InputLabel";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
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

export default function AdminProfile() {
  const classes = useStyles();
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [userName, setuserName] = React.useState(currentUser.email);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState({success: true, message:''})
  const { signup } = useAuth()
  const handlUpdate = () => {
    if(password !== confirmPassword){
      setError({success: false, message: 'passwords are not the same'});
      return;
    }
    
    
    if (password) {
      updatePassword(password).then((response) =>{
        if (userName !== currentUser.email) {
          updateEmail(userName).then.then((response) =>{
            //history.push("/")
            setError({success: true, message: "user updated with success"});
          }).catch((err) => {
            setError({success: false, message: err.message});
          })
        }else
          setError({success: true, message: "user created with success"});
      }).catch((err) => {
        setError({success: false, message: err.message});
      })
    }else{
      if (userName !== currentUser.email) {
        updateEmail(userName).then.then((response) =>{
          //history.push("/")
          setError({success: true, message: "user updated with success"});
        }).catch((err) => {
          setError({success: false, message: err.message});
        })
      }
    }
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
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
                    inputProps={{
                      value:userName,
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
              <Button color="primary" onClick={handlUpdate}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
