import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import AddroomModal from "../Modals/AddroomModal";

const { Panel } = Collapse;

const SidebarStyled = styled.div`
  background: #3f0e40;
  color: white;
  height: 100vh;
`;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyle = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <SidebarStyled>
        <Collapse ghost defaultActiveKey={["1"]}>
          <PanelStyled header="Danh sách các phòng" key="1">
            <LinkStyle>Room 1</LinkStyle>
            <Button
              type="text"
              className="add-room"
              icon={<PlusSquareOutlined />}
              onClick={showModal}
            >
              Thêm phòng
            </Button> 
          </PanelStyled>
        </Collapse>
      </SidebarStyled>
      <AddroomModal visible={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
}
