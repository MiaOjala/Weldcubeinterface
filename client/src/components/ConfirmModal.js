import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { API_WELDS_URL, API_WELD_DETAILS_URL, ENVIROMENT } from '../components/enviroment';
function ConfirmModal(props) {
    const [explanation, setExplanation] = useState("")
    const [user, setUser] = useState("")
    const [check, setCheck] = useState(false)

    const changeCheck = () => {
        setCheck(!check)
    }

    const notify = (isSuccess) => {
        if (isSuccess) {
            alert("Welds state changed succesfully")
        } else {
            alert("Something went wrong! Welds state was not changed")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let isSuccess = false
        try {
            // parametrit: props.id, explanation ja user muuttujissa
            await axios.post(API_WELD_DETAILS_URL+props.id+"/ChangeState?explanation="+explanation+"&user="+user)
            isSuccess = true
            handleClose()
        } catch (error) {
            isSuccess = false
            handleClose()
        }
        setTimeout(notify, 100, isSuccess)

    }
    const handleExpChange = (e) => {
        setExplanation(e.target.value)
    }
    const handleUserChange = (e) => {
        setUser(e.target.value)
    }
    const handleClose = () => {
        // Resets form values at close
        props.handleClose()
        setCheck(false)
        setExplanation("")
        setUser("")
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>You are changing state!</Modal.Title>
            </Modal.Header>
            <Modal.Body>You are changing the state of weld id: <span style={{ textDecoration: "underline" }}>{props.id}</span>
                <Form onSubmit={handleSubmit} className="pt-4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Explanation</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter explanation" onChange={(e) => handleExpChange(e)} value={explanation} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>User</Form.Label>
                        <Form.Control type="text" placeholder="User" onChange={(e) => handleUserChange(e)} value={user} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Confirm changes" checked={check} onChange={changeCheck} />
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose} className="me-2">
                        Close
                    </Button>
                    <Button variant="primary" disabled={!check} type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmModal