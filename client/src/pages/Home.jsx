import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import VideoCard from '../components/VideoCard';
import axios from 'axios'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`
export default function Home({type}) {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchVideos = async () =>{
            const res = await axios.get(`/videos/${type}`)
            setVideos(res.data)
        }
        fetchVideos()
    }, [type])
    return (
        <Container>
            {videos.map(video => (<VideoCard key={video._id} video={video}/>))}
            
        </Container>
    );
}

