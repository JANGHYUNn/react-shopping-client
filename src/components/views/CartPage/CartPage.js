/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_action';
import UserCartBlock from './Sections/UserCardBlock';

function CartPage(props) {
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0);

  const calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.map(item => (total += parseInt(item.price, 10) * item.quantity));

    setTotal(total);
  };

  const removeCartItemHandle = useCallback(productId => {
    dispatch(removeCartItem(productId));
  }, []);

  useEffect(() => {
    const cartItem = [];
    //  리덕스 user state 안에 cart 안에 상품이 들어있는지 확인
    if (props.user.auth && props.user.auth.cart) {
      if (props.user.auth.cart.length > 0) {
        props.user.auth.cart.forEach(item => {
          cartItem.push(item.id);
        });
      }
      dispatch(getCartItems(cartItem, props.user.auth.cart)).then(response => {
        calculateTotal(response.payload);
      });
    }
  }, [props.user.auth]);

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCartBlock
          products={props.user?.cartDetail}
          remove={removeCartItemHandle}
        />
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2>Total Amount: ${Total}</h2>
      </div>
    </div>
  );
}

export default CartPage;
