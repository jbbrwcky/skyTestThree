import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Moment from 'moment';
import styled from 'styled-components';
import { getMessages } from '../data';

const formatMessages = async () => await getMessages();

const DisplayUser = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const member = location.state.user;

  const sortMessages = (m) =>
    m.sort((a, b) => Moment(b.timestamp).unix() - Moment(a.timestamp).unix());

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await formatMessages();
      const m = sortMessages(response.filter(msgs => msgs.userId === member.id));
      setMessages(m);
    };

    fetchMessages();
  }, []);

  const getUserAvatar = () => member.avatar;

  const getUserName = () => {
    return `${member.firstName} ${member.lastName}`;
  };

  const getTimestamp = (id) => {
    return Moment(messages.find(m => m.id === id).timestamp).format('Do MMM yyyy hh:mm');
  };

  return (
    <>
      <H1>Messages for {member.firstName} {member.lastName}</H1>
      {messages.map(m => (
        <MessageSection key={m.id}>
          <MessageArticle>
            <Message>
              <MessageText>{m.message}</MessageText>
              <MessageTime>{getTimestamp(m.id)}</MessageTime>
            </Message>
            <Avatar
              alt={`Avatar for ${getUserName()}`}
              src={getUserAvatar()}
            />
          </MessageArticle>
        </MessageSection>
      ))}
    </>
  );
};

const H1 = styled.h1`
  margin: 0 0 0 10px;
`;

const MessageSection = styled.section`
  background-color: #ffffee;
  min-height: 25px;
  margin: 0 10px 10px 10px;
  width: 100%;
`;

const MessageArticle = styled.article`
  border: 1px solid #cccccc;
  display: flex;
  flex-end: justify-content;
  margin: 0;
`;

const Avatar = styled.img`
  flex: 0 1 100px;
  height: 100px;
  width: 100px;
`;

const Message = styled.p`
  align-content: flex-start;
  align-items: flex-start;
  flex: 0 1 100%;
`;

const MessageText = styled.span`
  display: flex;
  flex: 0 1 100%;
  margin: 0;
  padding: 0 0 0 10px;
`;

const MessageTime = styled.span`
  display: flex;
  flex: 0 1 100%;
  padding: 0 0 0 10px;
`;

export default DisplayUser;