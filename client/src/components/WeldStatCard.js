import React from 'react'
import Card from 'react-bootstrap/Card';

function WeldStatCard(props) {
    return (
        <Card className='m-2' style={{ minWidth: "18rem", backgroundColor: props.color}}>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text style={{}}>{props.body}</Card.Text>
            </Card.Body>
        </Card>
    )
}
export default WeldStatCard