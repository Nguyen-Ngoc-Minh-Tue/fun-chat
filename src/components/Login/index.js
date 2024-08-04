import { Button, Col, Row, Typography } from "antd";
import React from "react";
import firebase, { auth } from "../../firebase/config";
import { addDocument } from "../../firebase/services";

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const handleFbLogin = async () => {
    auth.signInWithPopup(fbProvider);
  };
  const handleGoogleLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(
      googleProvider
    );

    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.displayName,
        providerId: additionalUserInfo.providerId,
      });
    }
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button
            style={{ width: "100%", marginBottom: 5 }}
            onClick={handleGoogleLogin}
          >
            Đăng nhập bằng Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFbLogin}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
