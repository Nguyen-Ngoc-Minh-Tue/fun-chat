import React from "react";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";
import { auth } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

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
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? <UserOutlined /> : displayName?.charAt(0)?.toUpperCase()}
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
  );
}
