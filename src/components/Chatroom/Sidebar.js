import { Col, Row } from "antd";
import React from "react";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";

export default function Sidebar() {
  return (
    <div>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </div>
  );
}
