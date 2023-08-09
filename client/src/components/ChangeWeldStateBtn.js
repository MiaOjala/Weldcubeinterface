import React, { useState } from 'react'
import { Button } from "react-bootstrap";
import ConfirmModal from './ConfirmModal';


function ChangeWeldStateBtn(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
    <Button variant="outline-primary" onClick={handleShow}>
      Change state
    </Button>
    {/* Modal */}
    <ConfirmModal show={show} handleClose={handleClose} id={props.id}/>
  </div>
  )
}

export default ChangeWeldStateBtn