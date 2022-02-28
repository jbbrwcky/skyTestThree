import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import styled from 'styled-components';
import { getMembers, getMessages } from '../data';

const formatMessages = async () => await getMessages();

const formatMembers = async () => await getMembers();

const DisplayMessages = () => {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await formatMessages();
      setMessages(response);
    };
    
    const fetchMembers = async () => {
      const response = await formatMembers();
      setMembers(response);
    };

    fetchMessages();
    fetchMembers();
  }, []);

  const getUser = (id) => {
    const user = members.find(m => m.id === id);
    return user;
  };

  const getUserEmail = (id) => {
    const user = members.find(m => m.id === id);
    return user && user.email;
  };

  const getUserAvatar = (id) => {
    const user = members.find(m => m.id === id);
    return user.avatar;
  };

  const getUserName = (id) => {
    const user = members.find(m => m.id === id);
    return `${user.firstName} ${user.lastName}`;
  };

  const getTimestamp = (id) => {
    return Moment(messages.find(m => m.id === id).timestamp).format('Do MMM yyyy hh:mm');
  };

  const sortMessages = () => {
    return messages.sort((a, b) => Moment(b.timestamp).unix() - Moment(a.timestamp).unix());
  };

  return (
    <>
      {messages.length > 1 && sortMessages(messages).map(m => (
        <MessageSection key={m.id}>
          <MessageArticle>
            <Message title={getUserEmail(m.userId)}>
              <MessageText>{m.message}</MessageText>
              <MessageTime>
                {getTimestamp(m.id)},
                <Link
                  to={{ pathname: "/user", state: { user: getUser(m.userId) }}}
                >
                  {getUserName(m.userId)}
                </Link>
              </MessageTime>
            </Message>
            <Avatar alt={`Avatar for ${getUserName(m.userId)}`} src={getUserAvatar(m.userId)} />
          </MessageArticle>
        </MessageSection>
      ))}
    </>
  );
};

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

export default DisplayMessages;