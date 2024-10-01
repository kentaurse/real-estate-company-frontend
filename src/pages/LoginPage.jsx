import React from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setUser } from "../redux/slices/UserSlice";
import { MailOutlined, KeyOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(location.pathname);
  // "/recipLogin"   "/senderLogin"
  const onFinish = async (values) => {
    const res = await axios.post('/login', values);
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    dispatch(setUser(res.data));
    Notification('Successful Login!');
    navigate('/messages');
  }

  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <Form className="w-full border border-border-100 p-2 max-w-[500px] rounded-2xl bg-bg-light-dark"
        initialValues={{
          userId: "satomichru",
          password: '123456',
        }}
        onFinish={onFinish}
      >
        <div className="flex flex-col justify-center items-center py-5">
          <img src="/logo.png" className="w-24 pb-2" />
          <Title>プッシュ通知システム</Title>
        </div>
        <Form.Item label={"ログインID:"} name={"userId"}
          rules={[
            {
              required: true,
              message: 'Please input your UserId!',
            }
          ]}
        >
          <Input prefix={<MailOutlined />} required />
        </Form.Item>
        <Form.Item label={"パスワード:"} name={"password"}
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password prefix={<KeyOutlined />} required />
        </Form.Item>
        {/* <div className="flex justify-between px-2">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item name="forget">
            <Button type="link">Forget Password？</Button>
          </Form.Item>
        </div> */}
        <div className="flex justify-evenly pt-4 pb-10">
          <Form.Item name="login">
            <Button type="primary" htmlType="submit" className="w-[280px]">ログイン</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
export default LoginPage;