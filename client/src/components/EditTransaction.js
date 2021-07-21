import React, {useState} from 'react';
import { Button, Modal } from '@material-ui/core';

function SimpleModal() {
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const body = (
      <div >
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
