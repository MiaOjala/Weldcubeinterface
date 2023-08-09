import React from 'react'
import { Row, Col } from "react-bootstrap";
import WeldStatCard from './WeldStatCard';

function GeneralInfo(props) {
    const data = props.data

    const statusColor = (state) => {
        if (state === "Ok" || state === "OkEdited") {
          return (
            <Col>
              <WeldStatCard
                title={"State"}
                body={data.general.State}
                color={"#90EE90"}
              />
            </Col>
          );
        }
        if (state === "NotOk" || state === "NotOkEdited") {
          return (
            <Col>
              <WeldStatCard
                title={"State"}
                body={data.general.State}
                color={"#FF7377"}
              />
            </Col>
          );
        }
        return (
          <Col>
            <WeldStatCard
              title={"State"}
              body={data.general.State}
              color={"#ffb732"}
            />
          </Col>
        );
      };
  return (
    <>
              <h2 className="d-flex pt-5 mb-3">General info</h2>
          <Row>{statusColor(data.general.State[0])}</Row>
          <Row>
            {typeof data.general.Errors[0]?.Error !== "undefined" && (
              <Col>
                <WeldStatCard
                  title={
                    "Error code" + data.general.Errors[0].Error[0].ErrorCode
                  }
                  body={
                    data.general.Errors[0].Error[0].ErrorCodeName +
                    " | " +
                    data.general.Errors[0].Error[0].Description
                  }
                  color={"#FF7377"}
                />
              </Col>
            )}
            <Col>
              <WeldStatCard title={"Weld id"} body={data.general.WeldId} color={"#FFFFF"} />
            </Col>
            <Col>
              <WeldStatCard
                title={"Time"}
                body={data.general.TimeStamp}
                color={"#FFFFF"}
              />
            </Col>
            <Col>
              <WeldStatCard
                title={"Duration"}
                body={data.general.Duration}
                color={"#FFFFF"}
              />
            </Col>
            <Col>
              <WeldStatCard
                title={"Part item number"}
                body={data.general.PartItemNumber}
                color={"#FFFFF"}
              />
            </Col>
            <Col>
              <WeldStatCard
                title={"Part serial number"}
                body={data.general.PartSerialNumber}
                color={"#FFFFF"}
              />
            </Col>
            <Col>
              <WeldStatCard
                title={"Processing step number"}
                body={data.general.ProcessingStepNumber}
                color={"#FFFFF"}
              />
            </Col>
            <Col>
              <WeldStatCard
                title={"Machine serial number"}
                body={data.general.MachineSerialNumber}
                color={"#FFFFF"}
              />
            </Col>
            <Col>
              <WeldStatCard
                title={"Machine type"}
                body={data.general.MachineType}
                color={"#FFFFF"}
              />
            </Col>
            <Col>
              <WeldStatCard
                title={"Welder"}
                body={data.general.Welder}
                color={"#FFFFF"}
              />
            </Col>
          </Row>
    </>
  )
}

export default GeneralInfo