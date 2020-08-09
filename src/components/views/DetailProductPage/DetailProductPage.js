/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

const apiUrl = process.env.REACT_APP_API_URL;

function DetailProductPage(props) {
  const { productId } = props.match.params;

  const [Product, setProduct] = useState({});
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/api/product/products_by_id?productId=${productId}&type=single`,
      )
      .then(({ data }) => {
        if (data.success) {
          setProduct(data.product[0]);
          setIsLoading(true);
        } else {
          alert('상세 정보 가져오기를 실패했습니다.');
        }
      });
  }, []);

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      {IsLoading ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1>{Product.title}</h1>
          </div>
          <br />
          <Row gutter={[16, 16]}>
            {/* productImage */}
            <Col lg={12} sm={24}>
              <ProductImage detail={Product} />
            </Col>

            {/* productInfo */}
            <Col lg={12} sm={24}>
              <ProductInfo detail={Product} />
            </Col>
          </Row>
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default DetailProductPage;
