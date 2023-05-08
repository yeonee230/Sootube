import React from 'react';
import styled from 'styled-components';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { RiShareForwardLine, RiDownloadLine } from 'react-icons/ri';
import Comments from '../components/Comments';
import VideoCard from '../components/VideoCard';
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
`;
const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
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
`;

export default function Video() {
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            title='title'
            width='100%'
            height='600'
            src='https://www.youtube.com/watch?v=AjnByCGS2Bs'
            frameborder='0'
            // allow='accelerometer;autoplay;clipboard-write;encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </VideoWrapper>
        <Title>비디오 타이틀</Title>
        <Details>
          <Info>100,000 views • Jun 13, 2023</Info>
          <Buttons>
            <Button>
              <AiOutlineLike />
              100
            </Button>
            <Button>
              <AiOutlineDislike />
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
            <Image />
            <ChannelDetail>
              <ChannelName>Soo</ChannelName>
              <ChannelCounter>100K subscribers</ChannelCounter>
              <Description>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempora qui officia inventore quibusdam dolores obcaecati, esse
                excepturi sed nam sint atque laboriosam dolorem et, ex delectus.
                Impedit quisquam maiores dolorum?
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>Subscribe</Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      <Recommendation>
        <VideoCard type="sm"/>
        <VideoCard type="sm"/>
        <VideoCard type="sm"/>
      </Recommendation>
    </Container>
  );
}
