import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../utils/api';
import { useSelector } from 'react-redux';

export default function Upload({ setOpen }) {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(','));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imgUrl'
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, 'videoUrl');
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, 'imgUrl');
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log('url',`${serverUrl}/videos`, { ...inputs, tags, userId:currentUser._id })
    // const res = await axios.post(`${serverUrl}/videos`, { ...inputs, tags, userId:currentUser._id });
    // console.log('res',res)

    //test
    const res = await axios.post(`http://localhost:8800/api/videos`, { userId:currentUser._id });
    console.log('res',res)
    setOpen(false);
    res.status === 200 && navigate(`/videos/${res.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label htmlFor='video'>Video file : </Label>
        {videoPerc > 0 ? (
          'Uploading: ' + videoPerc + '%'
        ) : (
          <Input
            id='video'
            type='file'
            accept='video/*'
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Label>Video Info</Label>
        <Input
          type='text'
          placeholder='Title'
          name='title'
          onChange={handleChange}
        />
        <Desc
          placeholder='Descripton'
          rows={8}
          name='desc'
          onChange={handleChange}
        />
        <Input
          type='text'
          placeholder='Separate the tags with commas(,).'
          onChange={handleTags}
        />
        <Label htmlFor='thumb'>Thumbnail Image : </Label>
        {imgPerc > 0 ? (
          'Uploading: ' + imgPerc + '%'
        ) : (
          <Input
            id='thumb'
            type='file'
            accept='image/*'
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #060101c2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLigther};
  color: ${({ theme }) => theme.textModal};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: #3ea6ff;
  font-weight: 500;
  padding: 10px 20px;
  &:hover {
    background-color: rgb(61, 166, 255, 0.8);
  }
`;

const Label = styled.label`
  font-size: 14px;
`;
