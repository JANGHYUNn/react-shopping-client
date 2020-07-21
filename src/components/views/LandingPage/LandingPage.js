/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { RocketOutlined } from '@ant-design/icons';
import ImageSlider from '../../utils/ImageSlider';

const apiUrl = process.env.REACT_APP_API_URL;

function LandingPage() {
  const [Product, setProduct] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);

  useEffect(() => {
    const body = {
      skip: Skip,
      limit: Limit,
    };

    Axios.post(`${apiUrl}/api/product/products`, body).then(response => {
      if (response.data.success) {
        setProduct(response.data.productInfo);
      } else {
        alert('상품을 불러오지 못하였습니다.');
      }
    });
  }, [Limit, Skip]);

  const renderCards = Product.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const loadMoreHandler = () => {};

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          Let’s Travel Anywhere
          <RocketOutlined />
        </h2>

        {/* Cards */}
        <Row gutter={[16, 16]}>{renderCards}</Row>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="button" onClick={loadMoreHandler}>
          더보기
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
