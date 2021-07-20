import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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
const ListTransactions = () => {
  const [transactions, setTrans] = useState({
    transes: [],
    currentBudget: 0
  });

  const getTrans = async () => {
    try{
      const response = await fetch("http://localhost:3000/");
      let latestData = await response.json();
      let newBudget = 0;
      latestData.forEach(data => {
        if(data.type === 'IN'){
          newBudget += data.amount;
        } else{
          newBudget -= data.amount;
        }
      });
      if(latestData.length > 10){
        latestData = latestData.slice(0, 10);
      }
      let newTrans = {...transactions};
      newTrans['transes'] = latestData;
      newTrans['currentBudget'] = newBudget; 
      setTrans(newTrans);
    } catch(err){
        console.log(err.message);
    }
  };

  useEffect(() => {
    getTrans();
  }, []);

  const classes = useStyles();
  return (
      <>
        <h2>Current budget: {transactions.currentBudget}</h2>
        <h1>Transaction History</h1>

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
          {(transactions.transes).map((trans) => (
            <StyledTableRow key={trans.concept}>
              <StyledTableCell component="th" scope="row">
                {trans.concept}
              </StyledTableCell>
              <StyledTableCell align="right">{trans.type === 'IN' ? trans.amount : -trans.amount}</StyledTableCell>
              <StyledTableCell align="right">{trans.date}</StyledTableCell>
              <StyledTableCell align="right">{trans.type}</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </>
  );
};

export default ListTransactions;
