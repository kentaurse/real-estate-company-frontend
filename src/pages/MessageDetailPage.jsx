import React, { useEffect, useState } from 'react';
import { Button, Image, Input, Radio, Space, Table, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const MessageDetailPage = () => {
  const { msgId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.user);
  const [relateUser, setRelateUser] = useState();
  const [message, setMessage] = useState([]);

  const onAgree = () => {

  }

  useEffect(() => {
    const main = async () => {
      const user = await axios.get(`/users/${userInfo.relateUser}`);
      const message = await axios.get(`/messages/${msgId}`);
      setRelateUser(user.data);
      setMessage(message.data);
    }
    main();
  }, [])

  return (
    <>
      <div>
        <div className='flex justify-between items-center'>
          <Typography className='flex flex-col pb-2'>
            <Title level={5} className='m-0'>＜利用者名 {relateUser?.name}様＞</Title>
            <Title level={5} className='m-0'>＜ログイン {userInfo?.name}様＞</Title>
          </Typography>
          <Button type='primary' onClick={() => navigate(`/messages`)}>一覧へ戻る</Button>
        </div>
        <div className='flex flex-col items-center'>
          <Typography className='max-w-[800px]'>
            <Title level={3}>タイトル：</Title>
            <Title level={3} className='m-0'>{message.title}</Title>
            <Title level={5}>本文：</Title>
            <Text className='text-[18px]'>{message.content}</Text>
            {message?.file &&
              <div className='flex items-center pt-2'>
                <Image src='/pdf.png' preview={false} className='w-16' />
                <Text className='text-[18px]'>{message.file}</Text>
              </div>
            }
            {message?.answer &&
              <div className='flex items-center pt-2'>
                <div className='flex gap-2 items-center'>
                  <div className='flex flex-col gap-5'>
                    <CheckCircleOutlined className='text-[25px]' />
                    <CloseCircleOutlined className='text-[25px]' />
                  </div>
                  <Radio.Group onChange={onAgree} value={true}>\
                    <Space direction="vertical">
                      <Radio value={true}>同意する</Radio>
                      <Radio value={false}>同意しない</Radio>
                    </Space>
                  </Radio.Group>
                </div>
                <div className='flex flex-col gap-2 w-64'>
                  <Input placeholder='署名（名前入力）：' />
                  <Button type='primary'>回答送信</Button>
                </div>
              </div>
            }
          </Typography>
        </div>
      </div>
    </>
  );
};

export default MessageDetailPage;