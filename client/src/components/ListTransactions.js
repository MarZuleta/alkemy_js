import React, {useEffect, useState, useContext} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import deleteLogo from '../images/delete.png';
import {Context} from '../App';
import EditTransaction from "./EditTransaction";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#000000",
    fontFamily: 'Titillium Web, sans-serif',
    color: "#FFF7EB",
    fontSize: '1.6rem',
  },
  body: {
    fontFamily: 'Titillium Web, sans-serif',
    fontSize: '1.5rem',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});




const ListTransactions = (props) => {

  const {refresh, toggleRefresh} = useContext(Context);
  // const [transactions, setTrans] = useState({
  //   transes: [],
  //   currentBudget: 0
  // });

  const deleteTrans = async (id) => {
    try {
      const deletedTrans = await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE"
      });
      console.log(deletedTrans);
      toggleRefresh();
    } catch (err) {
      console.log(err.message);
    }
  };


  // const getTrans = async () => {
  //   try{
  //     const response = await fetch("http://localhost:3000/");
  //     let latestData = await response.json();
  //     let newBudget = 0;
  //     latestData.forEach(data => {
  //       if(data.type === 'IN'){
  //         newBudget += data.amount;
  //       } else{
  //         newBudget -= data.amount;
  //       }
  //     });
  //     if(latestData.length > 10){
  //       latestData = latestData.slice(0, 10);
  //     }
  //     let newTrans = {...transactions};
  //     newTrans['transes'] = latestData;
  //     newTrans['currentBudget'] = newBudget; 
  //     setTrans(newTrans);
  //   } catch(err){
  //       console.log(err.message);
  //   }
  // };

  // useEffect(() => {
  //   getTrans();
  // }, [refresh]);
  // const buttonStyle = {
  //   background: deleteLogo,
  // }

  const deleteStyle = {
    filter: 'invert(16%) sepia(99%) saturate(7338%) hue-rotate(333deg) brightness(95%) contrast(102%)',
  }
  const classes = useStyles();
  return (
      <>
        
        <h1>Recent transactions</h1>

        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Concept</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.transactions.transes).map((trans) => (
            <StyledTableRow key={trans.id}>
              <StyledTableCell component="th" scope="row">
                {trans.concept}
              </StyledTableCell>
              <StyledTableCell align="right">$ {trans.type === 'IN' ? trans.amount.toLocaleString(undefined, {maximumFractionDigits:2}) : -trans.amount.toLocaleString(undefined, {maximumFractionDigits:2})}</StyledTableCell>
              <StyledTableCell align="right">{trans.date.split("T")[0]}</StyledTableCell>
              <StyledTableCell align="right">{trans.type}</StyledTableCell>
              <StyledTableCell align="right"><EditTransaction type={trans.type} id={trans.id}/></StyledTableCell>
              <StyledTableCell align="right"><input style={deleteStyle} type='image' alt='Delete' src={deleteLogo} onClick={() => deleteTrans(trans.id)}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </>
  );
};

export default ListTransactions;
