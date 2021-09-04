import React, { useState, useContext, useEffect} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem} from '@material-ui/core';
import Header from './Header';
import EditTransaction from "./EditTransaction";
import {Context} from '../App';
import './Transactions.css';
import deleteLogo from '../images/delete.png';

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
const deleteStyle = {
  filter: 'invert(16%) sepia(99%) saturate(7338%) hue-rotate(333deg) brightness(95%) contrast(102%)',
}

  const types = [
    {
      value: 'IN',
      label: 'In'
    },
    {
      value:'OUT',
      label: 'Out'
    }
  ]
  
  const selectStyle ={
    fontFamily: 'Titillium Web, sans-serif',
    fontSize: '1.5rem',
  };

function Transactions() {
    const [transactions, setTrans] = useState({
        transes: []
    });
    const [type, setType] = useState('IN');

    const {refresh, toggleRefresh} = useContext(Context);

    const getTrans = async () => {
        try{
          const response = await fetch(`http://localhost:3000/${type}`);
          let latestData = await response.json();
          let newTrans = {...transactions};
          newTrans['transes'] = latestData;
          setTrans(newTrans);
        } catch(err){
            console.log(err.message);
        }
      };
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

      useEffect(() => {
        getTrans();
      }, [refresh]);
    
    const classes = useStyles();
    return (
        
        <>
            <Header></Header>
         <div className='trans-history'>         
        <h1>Transaction History</h1>
        <TextField
          onChange={(e) => {
            setType(e.target.value);
            toggleRefresh();
          }}
          required
          select
          style={selectStyle}
          label="Type"
          name="type"
          variant="filled"
          value={type}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Concept</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(transactions.transes).map((trans) => (
            <StyledTableRow key={trans.id}>
              <StyledTableCell component="th" scope="row">
                {trans.concept}
              </StyledTableCell>
              <StyledTableCell align="right">${trans.type === 'IN' ? trans.amount : -trans.amount}</StyledTableCell>
              <StyledTableCell align="right">{trans.date.split("T")[0]}</StyledTableCell>
              <StyledTableCell align="right"><EditTransaction type={trans.type} id={trans.id}/></StyledTableCell>
              <StyledTableCell align="right"><input style={deleteStyle} type='image' alt='Delete' src={deleteLogo} onClick={() => deleteTrans(trans.id)}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
    </div>  
        </>
    );
}

export default Transactions
