import React from "react";
import { Avatar, Button, Typography } from "antd";
import styled from "styled-components";
import { DeleteOutlined, FileOutlined } from "@ant-design/icons";

const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

export default function Message({ type, value, displayName, photoURL }) {
  const handleDownloadFile = () => {
    const url = window.URL.createObjectURL(
      new Blob([value.data.toUint8Array()])
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = value.name;
    link.accept = value.type;
    document.body.appendChild(link);
    link.click();
  };

  return (
    <WrapperStyled>
      <div>
        <Avatar size="small" src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Button icon={<DeleteOutlined />} type="text" />
        <Typography.Text className="date"></Typography.Text>
      </div>
      <div>
        {type !== "file" ? (
          <Typography.Text className="content">{value}</Typography.Text>
        ) : (
          <span>
            <FileOutlined onClick={handleDownloadFile} />
            {value.name}
          </span>
        )}
      </div>
    </WrapperStyled>
  );
}
