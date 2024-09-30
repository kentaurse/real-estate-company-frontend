import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    values['isUser'] ? values['role'] = "user" : values['role'] = "admin";
    const res = await axios.post("/register", values);
    if (res.status == 200) {
      Notification('Successful Register!');
      navigate("/recipLogin");
    }
  };

  const layout = {
    labelCol: {
      span: 6,
    }
  };

  const itemLayout = {
    labelCol: {
      span: 8,
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <Form className="w-full border border-border-100 p-2 max-w-[500px] rounded-2xl bg-bg-light-dark" {...layout}
        initialValues={{
          isUser: true
        }}
        onFinish={onFinish}
      >
        <div className="flex justify-center py-10">
          <img src="/logo.png" className="w-24" />
        </div>
        <Form.Item label={"名前:"} name={'name'}
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            }
          ]}
        >
          <Input prefix={<UserOutlined />} required />
        </Form.Item>
        <Form.Item label={"ログインID:"} name={'userId'}
          rules={[
            {
              required: true,
              message: 'Please input your UserId!',
            }
          ]}
        >
          <Input prefix={<UserOutlined />} required />
        </Form.Item>
        <Form.Item label={"メール:"} name={"email"}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your Email!',
            }
          ]}
        >
          <Input prefix={<MailOutlined />} required />
        </Form.Item>
        <div className="flex justify-between items-center gap-4">
          <Form.Item label={"関連ログインID:"} name={'relateUser'} className="flex-grow" {...itemLayout}
            rules={[
              {
                required: true,
                message: 'Please input your Relate User!',
              }
            ]}
          >
            <Input prefix={<UserOutlined />} required />
          </Form.Item>
          <Form.Item name="isUser" valuePropName="checked" className="">
            <Checkbox>ユーザー?</Checkbox>
          </Form.Item>
        </div>
        <Form.Item label={"パスワード:"} name={"password"}
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            }
          ]}
        >
          <Input.Password prefix={<KeyOutlined />} required />
        </Form.Item>
        <Form.Item label={"確認する:"} name={"confirm"}
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<KeyOutlined />} required />
        </Form.Item>
        <div className="flex justify-evenly pt-4 pb-10">
          <Form.Item name="register">
            <Button type="primary" htmlType="submit" className="w-[280px]">
              登録
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default RegisterPage;
