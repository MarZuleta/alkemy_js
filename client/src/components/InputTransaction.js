import React from "react";
import { useState } from "react";
import Axios from "axios";
import Button from '@material-ui/core/Button';

const InputTransaction = () => {
  const [trans, setTrans] = useState({
    concept: "",
    amount: "",
    date: "",
    type: "",
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
  };

  const changeField = (e) => {
    const newTrans = { ...trans };
    newTrans[e.target.className] = e.target.value;
    setTrans(newTrans);
  };

  return (
    <>
      <h1>Budget Manager</h1>
      <form onSubmit={(e) => submit(e)}>
        <input
          onChange={(e) => changeField(e)}
          className="concept"
          type="text"
          placeholder="Concept"
          value={trans.concept}
        />
        <input
          onChange={(e) => changeField(e)}
          className="amount"
          type="text"
          placeholder="Amount"
          value={trans.amount}
        />
        <input
          onChange={(e) => changeField(e)}
          className="date"
          type="date"
          placeholder="Date"
          value={trans.date}
        />
        <input
          onChange={(e) => changeField(e)}
          className="type"
          type="text"
          placeholder="Type"
          value={trans.type}
        />
        <Button variant="contained" color="primary">Add Transaction</Button>
      </form>
    </>
  );
};

export default InputTransaction;
