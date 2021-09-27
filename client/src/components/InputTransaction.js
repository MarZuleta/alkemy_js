import React, { useContext, useState } from "react";
import Axios from "axios";
import { Button, Modal, TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../App";

// Modal styles
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "7%",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const modalStyle = {
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
};
const buttonStyle = {
  // size: '2rem',
  backgroundColor: "rgb(11, 12, 172)",
  color: "white",
  fontFamily: "Titillium Web, sans-serif",
  fontWeight: "bold",
  fontSize: "1.5rem",
};
const modalTitleStyle = {
  display: "flex",
  justifyContent: "center",
};




// Select types
const types = [
  {
    value: "IN",
    label: "In",
  },
  {
    value: "OUT",
    label: "Out",
  },
];

const categories = [
  {
    value: "Food",
    label: "Food"
  },
  {
    value: "Work",
    label: "Work"
  },
  {
    value: "Health",
    label: "Health"
  },
  {
    value: "House",
    label: "House"
  },
  {
    value: "Books",
    label: "Books"
  },
  {
    value: "Entertainment",
    label: "Entertainment"
  }
]


//Modal component
const SimpleModal = () => {
  const [open, setOpen] = useState(false);
  const { toggleRefresh } = useContext(Context);
  const [trans, setTrans] = useState({
    concept: "",
    amount: "",
    date: "",
    type: "",
    category: ""
  });
  const classes = useStyles();

  
  const handleOpen = () => {
    setOpen(true);
    setTrans({
      concept: "",
      amount: "",
      date: "",
      type: "",
      category: ""
    });
  };

  const handleClose = () => {
    setOpen(false);
    setTrans({
      concept: "",
      amount: "",
      date: "",
      type: "",
      category: ""
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const res = await Axios.post("http://localhost:3000/", {
      concept: trans.concept,
      amount: trans.amount,
      date: trans.date,
      type: trans.type,
      category: trans.category
    });
    console.log(res);
    setTrans({
      concept: "",
      amount: "",
      date: "",
      type: "",
      category: ""
    });
    toggleRefresh();
    handleClose();
  };

  const changeField = (e) => {
    const newTrans = { ...trans };
    newTrans[e.target.name] = e.target.value;
    setTrans(newTrans);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" style={modalTitleStyle}>
        Add transaction
      </h2>
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

        <TextField
          onChange={(e) => changeField(e)}
          required
          select
          label="Category"
          name="category"
          variant="filled"
          value={trans.category}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" color="primary">
          Add Transaction
        </Button>

        <Button onClick={handleClose} variant="contained" color="secondary">
          Cancel
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <div>
        <Button
          size={"large"}
          style={buttonStyle}
          variant="contained"
          onClick={handleOpen}
        >
          ADD TRANSACTION
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
function InputTransaction() {
  return (
    <div>
      <SimpleModal />
    </div>
  );
}

export default InputTransaction;
