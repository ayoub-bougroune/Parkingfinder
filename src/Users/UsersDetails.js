import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {Table,TableBody, TableCell, TableRow, TableHead,
  TableContainer, Paper, Container, 
  Typography, Button, Grid, IconButton} from '@material-ui/core'
import { Link, useHistory } from "react-router-dom"
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


export default function Réservations() {
  const classes = useStyles();
  var [RéservationsObjects, setRéservationsObjects] = useState([]);

useEffect(() => {
        db.child('users').on('value', snapshot => {
            if (snapshot.val() != null) 
            setRéservationsObjects({
                ...snapshot.val()
              })    
        })
}, []);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Users
            </h4>
            <p className={classes.cardCategoryWhite}>
           
            </p>
  
          </CardHeader>
          <CardBody>
          <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>FullName</TableCell>
                            <TableCell className={classes.head}>Email </TableCell> 
                            <TableCell className={classes.head}>Phone Number </TableCell>                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                             {Object.keys(RéservationsObjects).map( id => {
                               return (<TableRow key={id}>
                                  <TableCell>{RéservationsObjects[id].fullName}</TableCell>
                                  <TableCell>{RéservationsObjects[id].mail}</TableCell>
                                  <TableCell>{RéservationsObjects[id].phone}</TableCell>
                              </TableRow>
                               )
                            })  
                          }
                    </TableBody>
                </Table>  
            </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
