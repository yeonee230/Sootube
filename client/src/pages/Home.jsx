import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import VideoCard from '../components/VideoCard';
import axios from 'axios';
import { serverUrl } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuccess } from '../redux/videoSlice';

export default function Home({ type }) {
  const [videos, setVideos] = useState([]);

  //test
  const path = '6459f5977d043bc773954724';
  const dispatch = useDispatch();
  const { currentVideo } = useSelector((state) => state.video);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${serverUrl}/videos/${type}`);
      setVideos(res.data);

      //test
      const videoRes = await axios.get(`${serverUrl}/videos/find/${path}`);
      console.log('videoRes1::', videoRes);
      dispatch(fetchSuccess(videoRes.data));
      console.log('currentVideo::', currentVideo);
    };

    fetchVideos();
    
  }, [type, dispatch, currentVideo]);
  return (
    <Container>
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
