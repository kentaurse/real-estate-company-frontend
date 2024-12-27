import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LiaStopCircle } from "react-icons/lia";

const { Title } = Typography;

const MessagesPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.user);
  const [relateUser, setRelateUser] = useState();
  const [messages, setMessages] = useState([]);

  const columns = [
    {
      key: '1',
      title: '未読既読',
      dataIndex: 'read',
      render: (text) => text ? '未' : '既',
    },
    {
      key: '2',
      title: '配信日',
      dataIndex: 'deliverDate',
      render: (text) => new Date(text).toISOString().slice(0, 10),
      sorter: (a, b) => new Date(a.deliverDate) - new Date(b.deliverDate)
    },
    {
      key: '3',
      title: 'タイトル',
      dataIndex: 'method'
    },
    {
      key: '4',
      title: '回答必須',
      dataIndex: 'answer',
      render: (text) => text ? <LiaStopCircle size={20} /> : '',
      sorter: (a, b) => a.answer - b.answer,
    },
    {
      key: '5',
      title: 'タイトル',
      dataIndex: 'title'
    }
  ]
  
  const selectMessage = (record) => {
    navigate(`/messages/${record._id}`);
  }

  useEffect(() => {
    const main = async () => {
      const user = await axios.get(`/users/${userInfo.relateUser}`);
      const message = await axios.get('/messages');
      setRelateUser(user.data);
      setMessages(message.data);
    }
    main();
  }, [])
  // const setMessage = async () => {
    //   await axios.post('/messages', {
  //     title: '部屋変更のご相談',
  //     content: 'いつも大変お世話になっております。 利用者様増大により 現在の201より大部屋の401への変更させていただいて もよろしいでしょうか？ご回答をお願いいたします。',
  //     method: '連絡',
  //     read: true,
  //     sender: 'kentaurse',
  //     receiver: 'satomichru',
  //     answer: true,
  //     deliverDate: Date.now(),
  //     // file: '2342_20240901.PDF'
  //   })
  // }

  return (
    <>
      <div>
        <Typography className='flex flex-col pb-2'>
          <Title level={5} className='m-0'>＜利用者名 {relateUser?.name}様＞</Title>
          <Title level={5} className='m-0'>＜ログイン {userInfo?.name}様＞</Title>
        </Typography>
        <Table columns={columns} dataSource={messages} scroll={{ x: 'max-content' }} 
          onRow = {record =>({
            onClick:()=>selectMessage(record)
          })}
        />
      </div>
    </>
  );
};

export default MessagesPage;