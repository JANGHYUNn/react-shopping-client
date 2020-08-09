/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { Menu, Badge } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCartOutlined } from '@ant-design/icons';

const apiUrl = process.env.REACT_APP_API_URL;

function RightMenu(props) {
  const user = useSelector(state => state.userReducer);

  const logoutHandler = () => {
    axios
      .get(`${apiUrl}/api/user/logout`, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          props.history.push('/login');
        } else {
          alert('Log Out Failed');
        }
      });
  };
  if (user.auth && !user.auth.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="cart" style={{ paddingBottom: '3px' }}>
          <Badge count={user.auth?.cart.length}>
            <a
              href="/user/cart"
              style={{ marginRight: '-22px', color: '#667777' }}
            >
              <ShoppingCartOutlined
                style={{ fontSize: '30px', marginBottom: '30' }}
              />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
