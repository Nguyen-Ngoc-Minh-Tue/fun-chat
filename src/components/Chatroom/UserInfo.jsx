import React from "react";
import { Button, Avatar, Typography, Row, Col } from "antd";
import styled from "styled-components";
import { auth } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import {
  FileTextOutlined,
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;

  .username {
    color: white;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);

  return (
    <>
      <WrapperStyled>
        <div>
          <Avatar src={photoURL}>
            {photoURL ? (
              <UserOutlined />
            ) : (
              displayName?.charAt(0)?.toUpperCase()
            )}
          </Avatar>
          <Typography.Text className="username">{displayName}</Typography.Text>
        </div>
        <Button
          ghost
          onClick={() => {
            auth.signOut();
          }}
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      </WrapperStyled>
      <Row
        style={{
          padding: "10px",
          borderBottom: "1px solid rgba(82, 38, 83)",
        }}
      >
        <Col span={6}>
          <Button type="link" icon={<MessageOutlined />}>
            Chat
          </Button>
        </Col>
        <Col span={6}>
          <Button type="link" icon={<VideoCameraOutlined />}>
            Call
          </Button>
        </Col>
        <Col span={6}>
          <Button type="link" icon={<UserOutlined />}>
            Contact
          </Button>
        </Col>
        <Col span={6}>
          <Button type="link" icon={<FileTextOutlined />}>
            Social
          </Button>
        </Col>
      </Row>
    </>
  );
}
