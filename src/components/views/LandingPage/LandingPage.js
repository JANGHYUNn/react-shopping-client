/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/exhaustive-deps */
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
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, price } from './Sections/Datas';

const apiUrl = process.env.REACT_APP_API_URL;

function LandingPage() {
  const [Product, setProduct] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState('');

  const getProducts = body => {
    Axios.post(`${apiUrl}/api/product/products`, body).then(response => {
      if (response.data.success) {
        if (body.loadMore) {
          setProduct([...Product, ...response.data.productInfo]);
        } else {
          setProduct(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert('상품을 불러오지 못하였습니다.');
      }
    });
  };

  useEffect(() => {
    const body = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(body);
  }, []);

  const loadMoreHandler = () => {
    const skip = Skip + Limit;
    const body = {
      skip,
      limit: Limit,
      loadMore: true,
    };
    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Product.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = filters => {
    const body = {
      skip: 0,
      limit: Limit,
      filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilter = { ...Filters };

    newFilter[category] = filters;

    if (category === 'price') {
      const priceValue = handlePrice(filters);
      newFilter[category] = priceValue;
    }

    showFilteredResults(newFilter);
    setFilters(newFilter);
  };

  const updateSearchTerm = newSearchTerm => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          Let’s Travel Anywhere
          <RocketOutlined />
        </h2>
        {/* Filter */}
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            {/* CheckBox */}
            <CheckBox
              list={continents}
              handleFilters={filter => handleFilters(filter, 'continents')}
            />
          </Col>
          {/* Radio */}
          <Col lg={12} xs={24}>
            <RadioBox
              list={price}
              handleFilters={filter => handleFilters(filter, 'price')}
            />
          </Col>
        </Row>

        {/* Search */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '1rem auto',
          }}
        >
          <SearchFeature refleshFunction={updateSearchTerm} />
        </div>
        {/* Cards */}
        <Row gutter={[16, 16]}>{renderCards}</Row>
      </div>
      {PostSize >= Limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="button" onClick={loadMoreHandler}>
            더보기
          </Button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
