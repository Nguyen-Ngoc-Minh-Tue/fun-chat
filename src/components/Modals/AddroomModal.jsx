import { Form, Input, Modal } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";

export default function AddroomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Add Group"
        open={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name Group" name="name">
            <Input placeholder="Type name group" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Type Description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
