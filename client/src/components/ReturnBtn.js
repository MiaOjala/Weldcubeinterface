import React from 'react'
import { Button } from "react-bootstrap";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function ReturnBtn() {
    const navigate = useNavigate();
    const handleReturnClick = () => {
        navigate("/");
      };
    
  return (
    <div>
    <Button onClick={handleReturnClick} variant="outline-primary" className=''>
      <span>
        <BsArrowReturnLeft />
      </span>{" "}
      Previous page
    </Button>
  </div>
  )
}

export default ReturnBtn