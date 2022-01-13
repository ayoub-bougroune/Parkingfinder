import React, { useEffect, useState } from 'react';
import { Button, Icon, TextField, Paper, Typography  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {db} from '../firebase'
import {isEmpty} from  'lodash'
import { useHistory , useParams} from 'react-router-dom';

export default function AddorEdit(props) {
  var [parkingsObjects, setParkingsObjects] = useState({});
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    iconSmall: {
      fontSize: 20
    },
    root: {
      padding: theme.spacing(3, 2)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400
    }
  }));

  const values = {
    name: "",
    Description: "",
    Lan: "",
    latutide: "",
    capacité: ""
}

  const [initialState, setState] = useState(values)
  const {name, Description, Lan, latutide, capacité} = initialState;
  const history = useHistory();
  let currentId = useParams();
  const {id} = currentId;
  
  const classes = useStyles();

  const handleInput = e => {
    var { name, value } = e.target
    setState({
        ...initialState,
        [name]: value,
    })
}

const handleSubmit = e =>{
    e.preventDefault();
    if (isEmpty(id)){
    db.child('Parkings').push(initialState,(err) => {
            if (err) {
                  console.log(err)
            }
        });
      } else 
      {
        db.child(`/Parkings/${id}`).set(initialState,(err) => {
          if (err) {
                console.log(err)
          }
      });
      }
    history.push('/Parkings')
}

useEffect(() => {
  db.child('Parkings').on('value', snapshot => {
      if (snapshot.val() !== null) {
        setParkingsObjects({
          ...snapshot.val()
        })
      } else {
        snapshot({});
      }
  })
}, [id]);

useEffect(() => {
  if (isEmpty(id))
  setState({
          ...initialFieldValues
      })
  else
  setState({
          ...parkingsObjects[id]
      })    
}, [id, parkingsObjects]);

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {props.formName}
        </Typography>
        <Typography component="p">{props.formDescription}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            id="margin-normal"
            name="name"
            value={name}
            className={classes.textField}
            helperText="Enter your full name"
            onChange={handleInput}
          /> <br/>
          <TextField
            label="Desctiption"
            id="margin-normal"
            name="Description"
            value={Description}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            onChange={handleInput}
          /><br/>
            <TextField
            label="lantutide"
            id="margin-normal"
            name="Lan"
            value={Lan}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            onChange={handleInput}
          /><br/>
            <TextField
            label="latutide"
            id="margin-normal"
            name="latutide"
            value={latutide}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            onChange={handleInput}
          /><br/>

            <TextField
            label="Capacité"
            id="margin-normal"
            name="capacité"
            value={capacité}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            onChange={handleInput}
          /><br/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </Paper>
    </div>
  );
}
