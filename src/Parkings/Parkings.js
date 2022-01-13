import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {Table,TableBody, TableCell, TableRow, TableHead,
  TableContainer, Paper, Container, 
  Typography, Button, Grid, IconButton} from '@material-ui/core'
import { Link, useHistory } from "react-router-dom"
import ParkingsDialog from '../Parkings/ParkingsDialog.js'
import {db} from '../firebase'
import {isEmpty} from  'lodash'



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  button: {
    margin: '20px',
    float: 'right',
},
  table: {
    minWidth: 650,
  },
  head: {
    backgroundColor:  '#000000',
    color: '#ffffff',
  }
};

const useStyles = makeStyles(styles);


export default function Parkings() {
  const classes = useStyles();
  var [parkingsObjects, setParkingsObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [parkId, setParkId] = useState('');
  const [name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Lan, setLan] = useState('');
  const [latutide, setLat] = useState('');
  const [capacité, setcapacité] = useState('');





  const handleName = (event) => {
    setName(event.target.value);
}

const handleDescription = (event) => {
  setDescription(event.target.value);
}

const handlelan = (event) => {
  setLan(event.target.value);
}

const handlelat = (event) => {
  setLat(event.target.value);
}

const handlecapacité = (event) => {
  setcapacité(event.target.value);
}


  const handleClose = () => {
    setOpen(false);
  }

  const handleAdd = () => {
    setOpen(true);
    setFormMode(true);
}



const addParking = obj => {
  db.child('Parkings').push(
      obj,
      err => {
          if (err)
                console.log(err)
      }
  )
  
  setOpen(false);
  setName('');
  setDescription('');
  setLan('');
  setLat('');
  setcapacité('');
}


const onDelete =  (id) => {
  if(window.confirm('Are you sure you wante to delete this record ?')){
       db.child(`Parkings/${id}`).remove((err) => {
           if (err) {
           console.log(err);
           }
       });
     }
};



useEffect(() => {
        db.child('Parkings').on('value', snapshot => {
            if (snapshot.val() != null) 
              setParkingsObjects({
                ...snapshot.val()
              })
        })
}, []);


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">


               <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                className={classes.button}
                startIcon={<AddCircle/>}
                >Add Parking</Button>

                 <Button variant="contained" type="file"  component="span" color="primary">upload image</Button>
          </CardHeader>
          <CardBody>
          <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Name</TableCell>
                            <TableCell className={classes.head}>Description</TableCell>
                            <TableCell className={classes.head}>Lan</TableCell>
                            <TableCell className={classes.head}>latutide</TableCell>
                            <TableCell className={classes.head}>Capacité</TableCell>
                            <TableCell className={classes.head}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                             {Object.keys(parkingsObjects).map( id => {
                               return <TableRow key={id}>
                                  <TableCell>{parkingsObjects[id].name}</TableCell>
                                  <TableCell>{parkingsObjects[id].Description}</TableCell>
                                  <TableCell>{parkingsObjects[id].Lan}</TableCell>
                                  <TableCell>{parkingsObjects[id].latutide}</TableCell>
                                  <TableCell>{parkingsObjects[id].capacité}</TableCell>
                                  <td>
                                    <IconButton onClick={() => onDelete(id)} color="secondary" aria-label="delete customer">
                                        <Delete />
                                    </IconButton>
                                    <Link to={`/update/${id}`}><a className="btn text-primary"><i className="fas fa-pencil-alt" /></a></Link>
                                  </td>
                              </TableRow>
                            })  
                          }
                    </TableBody>
                </Table>  
            </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
      <ParkingsDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                name={name}
                Description={Description}
                Lan={Lan}
                Lat={latutide}
                Lat={capacité}
                changename={handleName}
                changeDescription={handleDescription}
                changeLan={handlelan}
                changepostcode={handlelat}
                changeCity={handlecapacité}
                {...({addParking, parkId, parkingsObjects})}
            />
    </GridContainer>
  );
}
