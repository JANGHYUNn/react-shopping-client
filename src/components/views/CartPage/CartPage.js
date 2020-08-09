/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_action';
import UserCartBlock from './Sections/UserCardBlock';

function CartPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const cartItem = [];
    //  리덕스 user state 안에 cart 안에 상품이 들어있는지 확인
    if (props.user.auth && props.user.auth.cart) {
      if (props.user.auth.cart.length > 0) {
        props.user.auth.cart.forEach(item => {
          cartItem.push(item.id);
        });
      }
      dispatch(getCartItems(cartItem, props.user.auth.cart));
    }
  }, [props.user.auth]);
  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCartBlock products={props.user?.cartDetail} />
      </div>
    </div>
  );
}

export default CartPage;
