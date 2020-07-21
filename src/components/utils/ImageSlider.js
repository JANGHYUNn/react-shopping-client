/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Col, Card, Row, Carousel } from 'antd';

const apiUrl = process.env.REACT_APP_API_URL;

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{
                width: '100%',
                maxHeight: '140px',
                overFlow: 'hidden',
              }}
              src={`${apiUrl}/${image}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
