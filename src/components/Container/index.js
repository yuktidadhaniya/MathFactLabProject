import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";

const Container = ({ children, fluid }) => {
  return (
    <div>
      {fluid ? (
        <Row>
          <Col lg={24} xs={24}>
            {children}
          </Col>
        </Row>
      ) : (
        children
      )}
    </div>
  );
};

Container.propTypes = {
  fluid: PropTypes.bool, // if we need fluid container than true else false
};

export default Container;
