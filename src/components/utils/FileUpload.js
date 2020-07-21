/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function FileUpload() {
  const [Images, setImages] = useState([]);

  const dropHandler = files => {
    const formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    formData.append('file', files[0]);

    axios
      .post(`${apiUrl}/api/product/image`, formData, config)
      .then(response => {
        if (response.data.success) {
          setImages([...Images, response.data.filePath]);
        } else {
          console.log(response);
        }
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px',
              height: '240px',
              border: '1px solid lightgray',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {Images.map((image, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img
              style={{ minWidth: '350px', width: '100%', height: '240px' }}
              src={`${apiUrl}/${image}`}
            />
            <span
              style={{
                position: 'absolute',
                top: '0px',
                left: '7px',
                fontSize: '2rem',
                color: '#fff',
              }}
            >
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
