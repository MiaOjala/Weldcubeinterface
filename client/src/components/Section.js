import React from 'react'
import { Row, Col } from "react-bootstrap";
import WeldStatCard from './WeldStatCard';

function Section(props) {
  const cardHeaders = Object.keys(props.data[0].JobInfo[0]).filter(word => word !== "Details")
  const sectionList = props.data.map((x, i) => {
    let randomKey = Math.floor(Math.random() * 100000);
    return (
      <Col key={randomKey}>
        <h3 className="d-flex pt-5 mb-3">{"Section " + (x.Number[0])}</h3>
        {cardHeaders.map((header, index) => {
          let randomKey = Math.floor(Math.random() * 100000);
          var head = header
          return (
            <WeldStatCard
              key={randomKey}
              title={header}
              body={x.JobInfo[0][head]}
              color={"#FFFFF"}
            />
          )
        })}
      </Col>
    )
  })
  return (
    <Row>
      {sectionList}
    </Row>
  )
}

export default Section