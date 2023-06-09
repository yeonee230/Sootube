import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import { RiShareForwardLine, RiDownloadLine } from 'react-icons/ri';
import Comments from '../components/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';
import { serverUrl } from '../utils/api';
import { getCookie } from '../utils/cookie';

export default function Video() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  // const {token} = useSelector((state => state.user))
  // const { token, user } = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const path = useLocation().pathname.split('/')[2];

  const [channel, setChannel] = useState({});
  // const [currentVideo,setVideo] = useState({})

  const jwtCookie = getCookie('access_token')

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`${serverUrl}/videos/find/${path}`);
        const channelRes = await axios.get(
          `${serverUrl}/users/find/${videoRes.data.userId}`
        );

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
       
      } catch (error) {
        console.log('error::', error);
      }
    };

    fetchData();
    
  }, [path, dispatch]);

  if (!currentVideo) { //이 코드가 없으면 계속 오류가 생긴다. currentVideo === null 
    return <div>Loading...</div>; 
  }

  const handleLike = async () => {
    await axios.put(`${serverUrl}/users/like/${currentVideo._id}`, null, {
      headers: {
        "Authorization": `Bearer ${jwtCookie}`
      }
    });
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.put(`${serverUrl}/users/dislike/${currentVideo._id}`,null,{
      headers: {
        "Authorization": `Bearer ${jwtCookie}`
      }
    });
    dispatch(dislike(currentUser._id));
  };

  const handleSubscribe = async () => {
    if (currentUser.subscribedUsers.includes(channel._id)) {
      await axios.put(
        `${serverUrl}/users/unsub/${channel._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtCookie}`,
          },
        }
      );
      setChannel((prevChannel) => ({
        ...prevChannel,
        subscribers: prevChannel.subscribers - 1,
      }));
    } else {
      await axios.put(
        `${serverUrl}/users/sub/${channel._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtCookie}`,
          },
        }
      );
      setChannel((prevChannel) => ({
        ...prevChannel,
        subscribers: prevChannel.subscribers + 1,
      }));
    }
  
    dispatch(subscription(channel._id));

    // currentUser.subscribedUsers.includes(channel._id)
    //   ? await axios.put(`${serverUrl}/users/unsub/${channel._id}`,null,{
    //     headers: {
    //       "Authorization": `Bearer ${jwtCookie}`
    //     }
    //   })
    //   : await axios.put(`${serverUrl}/users/sub/${channel._id}`,null,{
    //     headers: {
    //       "Authorization": `Bearer ${jwtCookie}`
    //     }
    //   });

    // dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame
            src={currentVideo.videoUrl}
            controls
          />
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?._id) ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <AiFillDislike />
              ) : (
                <AiOutlineDislike />
              )}
              Dislike
            </Button>
            <Button>
              <RiShareForwardLine />
              Share
            </Button>
            <Button>
              <RiDownloadLine />
              Download
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}
            subscribed={currentUser?.subscribedUsers?.includes(channel._id)}
          >
            {currentUser?.subscribedUsers?.includes(channel._id)
              ? 'Subscribed'
              : 'Subscribe'}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation
        videoId={currentVideo._id}
        tags={currentVideo.tags}
      />
    </Container>
  );
}

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: black;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 20px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;

  ${props =>
    props.subscribed &&
   `
    background-color: #484848;
    opacity: 0.7;
  `}
`;
