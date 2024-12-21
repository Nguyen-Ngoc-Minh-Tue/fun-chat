import {
  FileAddOutlined,
  SendOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useContext, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Tooltip, Avatar, Form, Input } from "antd";
import InviteMemberModal from "../Modals/InviteMemberModal";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";
import { Bytes } from "firebase/firestore";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow() {
  const { members, selectedRoom, setIsInviteMemberVisible } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmitFile = async (e) => {
    const { name, type } = e.target.files[0];
    const arrayBuffer = await e.target.files[0].arrayBuffer();
    addDocument("messages", {
      type: "file",
      value: {
        name,
        type,
        data: Bytes.fromUint8Array(new Uint8Array(arrayBuffer)),
      },
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
  };

  const handleOnSubmit = () => {
    if (inputValue === "") return;

    addDocument("messages", {
      type: "text",
      value: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    form.resetFields(["message"]);

    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };

  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore("messages", condition);

  useEffect(() => {
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              <Button icon={<VideoCameraOutlined />} type="link">
                Gọi
              </Button>
              <Avatar.Group size="small" max={{ count: 2 }}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled ref={messageListRef}>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  type={mes.type}
                  value={mes.value}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  ref={inputRef}
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder="Type message..."
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button
                type="link"
                onClick={handleOnSubmit}
                icon={<SendOutlined />}
                title="Submit"
              />
              <Button
                type="link"
                onClick={handleOnSubmit}
                icon={<FileAddOutlined />}
                title="Upload File"
              >
                <Input
                  type="file"
                  style={{ position: "absolute", opacity: "0" }}
                  onChange={handleOnSubmitFile}
                />
              </Button>
            </FormStyled>
            <InviteMemberModal />
          </ContentStyled>
        </>
      ) : (
        <div></div>
      )}
    </WrapperStyled>
  );
}
