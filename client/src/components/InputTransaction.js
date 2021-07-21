import React, {useContext} from "react";
import { useState } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {Context} from '../App';


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

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

const InputTransaction = () => {
  const {refresh, toggleRefresh} = useContext(Context);
  const [trans, setTrans] = useState({
    concept: "",
    amount: "",
    date: "",
    type: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    const res = await Axios.post("http://localhost:3000/", {
      concept: trans.concept,
      amount: trans.amount,
      date: trans.date,
      type: trans.type,
    });
    console.log(res);
    setTrans({
      concept: "",
      amount: "",
      date: "",
      type: "",
    });
    toggleRefresh();
  };

  const changeField = (e) => {
    const newTrans = { ...trans };
    newTrans[e.target.name] = e.target.value;
    setTrans(newTrans);
  };

  const classes = useStyles();

  return (
    <>
      <h1>Budget Manager</h1>
      
      <form className={classes.root} onSubmit={(e) => submit(e)}>
        <TextField
          onChange={(e) => changeField(e)}
          name="concept"
          required
          label="Concept"
          value={trans.concept}
          variant="filled"
        />
        <TextField
          onChange={(e) => changeField(e)}
          required
          name="amount"
          type="number"
          variant="filled"
          label="Amount"
          value={trans.amount}
        />
        <TextField
          onChange={(e) => changeField(e)}
          required
          name="date"
          variant="filled"
          type="date"
          label="Date"
          InputLabelProps={{
            shrink: true,
          }}
          value={trans.date}
        />

        <TextField
          onChange={(e) => changeField(e)}
          required
          select
          label="Type"
          name="type"
          variant="filled"
          value={trans.type}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" color="primary">
          Add Transaction
        </Button>
      </form>
    </>
  );
};

export default InputTransaction;
