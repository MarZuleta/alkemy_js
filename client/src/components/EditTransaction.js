import React, {useState, useContext} from 'react';
import { Button, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
import {Context} from '../App';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  }
}));

function SimpleModal(props) {
    const [open, setOpen] = useState(false);
    const {refresh, toggleRefresh} = useContext(Context);
    const [trans, setTrans] = useState({
      concept: "",
      amount: "",
      date: "",
      type: props.type
    });
    const classes = useStyles();

    const modalStyle = {
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`
    };
    const handleOpen = () => {
      setOpen(true);
      setTrans({
        concept: "",
        amount: "",
        date: "",
        type: props.type,
      });
    };
  
    const handleClose = () => {
      setOpen(false);
      setTrans({
        concept: "",
        amount: "",
        date: "",
        type: props.type,
      });
    };
    const changeField = (e) => {
      const newTrans = { ...trans };
      newTrans[e.target.name] = e.target.value;
      setTrans(newTrans);
    };


    const submit = async (e) => {
      e.preventDefault();
      const res = await Axios.put(`http://localhost:3000/${props.id}`, {
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
      handleClose();
    };
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Edit transaction</h2>
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
        
        <Button type="submit" variant="contained" color="primary">
          Apply
        </Button>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Cancel
        </Button>
        

      </form>
      </div>
    );
  
    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Edit
        </Button>
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
  }
function EditTransaction(props) {
    return (
        <div>
            <SimpleModal type={props.type} id={props.id}/>
        </div>
    )
}

export default EditTransaction;
