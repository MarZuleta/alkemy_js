import React, {useState} from 'react';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function SimpleModal() {
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const modalStyle = {
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`
    };
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
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
function EditTransaction() {
    return (
        <div>
            <SimpleModal/>
        </div>
    )
}

export default EditTransaction;
