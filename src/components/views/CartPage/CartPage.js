/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Empty, Result } from 'antd';
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from '../../../_actions/user_action';
import UserCartBlock from './Sections/UserCardBlock';
import Paypal from '../../utils/Paypal';

function CartPage(props) {
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  const calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.map(item => (total += parseInt(item.price, 10) * item.quantity));

    setTotal(total);
    setShowTotal(true);
  };

  const removeCartItemHandle = useCallback(productId => {
    dispatch(removeCartItem(productId)).then(response => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  }, []);

  const transactionSuccess = data => {
    dispatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: props.user.cartDetail,
      }),
    ).then(response => {
      if (response.payload.success) {
        setShowTotal(false);
        setShowSuccess(true);
      }
    });
  };

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
      {ShowTotal ? (
        <div style={{ marginTop: '3rem' }}>
          <h2>Total Amount: ${Total}</h2>
        </div>
      ) : ShowSuccess ? (
        <Result status="success" title="SuccessFully Purchased Items" />
      ) : (
        <>
          <br />
          <Empty description={false} />
        </>
      )}
      {ShowTotal ? <Paypal total={Total} onSuccess={transactionSuccess} /> : ''}
    </div>
  );
}

export default CartPage;
