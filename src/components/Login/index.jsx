import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import React from "react";
import { auth } from "../../firebase/config";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { addDocument, generateKeywords } from "../../firebase/services";

const { Title } = Typography;

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export default function Login() {
  const handleLogin = async (provider) => {
    const result = await signInWithPopup(auth, provider);
    const additionalUserInfo = getAdditionalUserInfo(result);
    const user = result.user;

    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase()),
      });
    }
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title level={3} style={{ textAlign: "center" }}>
            Fun Chat
          </Title>
          <Button
            icon={<GoogleOutlined />}
            style={{ width: "100%", marginBottom: "5px" }}
            onClick={() => handleLogin(googleProvider)}
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            icon={<FacebookOutlined />}
            style={{ width: "100%" }}
            onClick={() => handleLogin(fbProvider)}
          >
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
