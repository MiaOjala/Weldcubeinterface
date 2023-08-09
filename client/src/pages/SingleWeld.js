import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ConvertToJson from "../components/ConvertToJson";
import TableCard from "../components/TableCard";
import Section from "../components/Section";
import GeneralInfo from "../components/GeneralInfo";
import ReturnBtn from "../components/ReturnBtn";
import ChangeWeldStateBtn from "../components/ChangeWeldStateBtn";
import AppContext from "../AppContext";
import { API_WELD_DETAILS_URL, ENVIROMENT } from "../components/enviroment";

function SingleWeld() {
  const [data, setData] = useState({
    general: {},
    weldDataStats: [],
    weldSingleStats: [],
    limitViolations: [],
    sections: []
  });
  const { id } = useContext(AppContext)
  const weldId = id;

  useEffect(() => {
    const fetchWeldStats = async () => {
      try {
        var res;
        ENVIROMENT == 'dev' ? res = await axios.get(API_WELD_DETAILS_URL)
        : res = await axios.get(API_WELD_DETAILS_URL + weldId,{headers:{Accept:"Application/xml","Content-Type":"Application/xml"}})
        const data = ConvertToJson(res.data);
        setData({
          general: data.WeldResponseModel,
          weldDataStats: data.WeldResponseModel.WeldData[0].Stats[0].MinMeanMax,
          weldSingleStats:
            data.WeldResponseModel.WeldData[0].SingleStats[0].SingleStat,
          limitViolations:
            data.WeldResponseModel.WeldData[0].LimitViolations[0]
              .LimitViolation,
          sections: data.WeldResponseModel.WeldData[0].Sections[0].Section
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeldStats();
  }, []);

  return (
    <Container>
      {/* return button */}
      <Row className="pt-5">
        <Col sm={4} lg={2}><ReturnBtn /></Col>
        <Col sm={4} lg={2}><ChangeWeldStateBtn id={weldId} /></Col>
      </Row>

      {typeof data.general.WeldId != "undefined" && (
        <div>
          {/* General infos */}
          <GeneralInfo data={data} />
          {/* Limit violations */}
          <h2 className="d-flex mt-5 mb-3">Limit violations</h2>
          {typeof data.limitViolations != "undefined" ? (
            <Row>
              <Col>
                <TableCard
                  data={data.limitViolations}
                  headers={Object.keys(data.limitViolations[0])}
                />
              </Col>
            </Row>
          ) : (
            null
          )}
          {/* Weld stats */}
          <h2 className="d-flex mt-5 mb-3">Weld stats</h2>
          <Row>
            <Col>
              <TableCard
                data={data.weldDataStats}
                headers={Object.keys(data.weldDataStats[0])}
              />
            </Col>
          </Row>
          {/* Single stats */}
          <h2 className="d-flex mt-5 mb-3">Single stats</h2>
          <Row>
            <Col>
              <TableCard
                data={data.weldSingleStats}
                headers={Object.keys(data.weldSingleStats[0])}
              />
            </Col>
          </Row>
          {/* Sections */}
            <Section data={data.sections} />
        </div>
      )}
    </Container>
  );
}

export default SingleWeld;
