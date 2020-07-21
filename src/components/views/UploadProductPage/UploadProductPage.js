/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import Axios from 'axios';
import FileUpload from '../../utils/FileUpload';

const { TextArea } = Input;

const Continents = [
  { key: 1, value: 'Singapore' },
  { key: 2, value: 'Canada' },
  { key: 3, value: 'Australia' },
  { key: 4, value: 'USA' },
  { key: 5, value: 'Korea' },
  { key: 6, value: 'Maxico' },
  { key: 7, value: 'India' },
  { key: 8, value: 'Rusia' },
  { key: 9, value: 'Ireland' },
];

const apiUrl = process.env.REACT_APP_API_URL;

export default function UploadProduct(props) {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = e => {
    setTitle(e.target.value);
  };

  const descriptionChangeHandler = e => {
    setDescription(e.target.value);
  };

  const priceChangeHandler = e => {
    setPrice(e.target.value);
  };

  const continentChangeHandler = e => {
    setContinent(e.target.value);
  };

  const updateImages = newImages => {
    setImages(newImages);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (!Title || !Description || !Price || !Continent || !Images) {
      return alert('모든 값을 넣어주셔야 합니다.');
    }

    const body = {
      writer: props.user.auth._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continent: Continent,
    };

    Axios.post(`${apiUrl}/api/product`, body).then(response => {
      if (response.data.success) {
        alert('상품 업로드에 성공 했습니다.');
        props.history.push('/');
      } else {
        alert('상품 업로드에 실패 했습니다.');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>여행 상품 업로드</h2>
      </div>
      <Form>
        <FileUpload refreshFunction={updateImages} />
        <label>제목</label>
        <Input value={Title} onChange={titleChangeHandler} />
        <br />
        <br />
        <label>설명</label>
        <TextArea value={Description} onChange={descriptionChangeHandler} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map(item => {
            return (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <Button type="submit" onClick={submitHandler}>
          확인
        </Button>
      </Form>
    </div>
  );
}
