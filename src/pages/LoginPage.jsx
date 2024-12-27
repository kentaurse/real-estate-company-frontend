import React from "react";
import { Button, Form, Input, Typography, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setUser } from "../redux/slices/UserSlice";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const res = await axios.post('/login', values);
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    dispatch(setUser(res.data));
    Notification('Successful Login!');
    navigate('/messages');
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Form className="w-full border border-border-100 p-14 max-w-[500px] rounded-2xl bg-bg-light-dark"
        // initialValues={{
        //   userId: "",
        //   password: '',
        // }}
        onFinish={onFinish}
      >
        <div className="flex flex-col py-4">
          <Title>ログイン</Title>
        </div>
        <Form.Item name={"userId"}
          rules={[
            {
              required: true,
              message: 'Please input your UserId!',
            }
          ]}
        >
          <Space.Compact size="large" className="w-full">
            <Input addonBefore={<UserOutlined />} placeholder="ユーザーネーム" required  className="w-full"/>
          </Space.Compact>
        </Form.Item>
        <Form.Item name={"password"}
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Space.Compact size="large" className="w-full">
            <Input.Password addonBefore={<LockOutlined />} placeholder="パスワード" required  className="w-full"/>
          </Space.Compact>
        </Form.Item>
        <div className="flex pt-4">
          <Form.Item name="login">
            <Button type="primary" htmlType="submit" className="w-[130px] h-[45px]">ログイン</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
export default LoginPage;