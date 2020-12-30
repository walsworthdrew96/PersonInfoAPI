import React from "react";

import contentData from "../utils/ContentData";
import { Col, Row } from "react-bootstrap";

const Content = () => (
  <div className="next-steps my-5">
    <h2 className="my-5 text-center">Features</h2>
    <Row className="d-flex justify-content-between">
      {contentData.map((col, i) => (
        <Col key={i} md={5} className="mb-4">
          <h6 className="mb-3">
            <a target="_blank" rel="noopener noreferrer" href={col.link}>
              {col.title}
            </a>
          </h6>
          <p>{col.description}</p>
        </Col>
      ))}
    </Row>
  </div>
);

export default Content;
