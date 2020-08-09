/* eslint-disable no-unused-expressions */
import React from 'react';
import './UserCardBlock.css';
import { useDispatch } from 'react-redux';

const apiUrl = process.env.REACT_APP_API_URL;

function UserCardBlock(props) {
  const renderCartImage = images => {
    if (images.length > 0) {
      const image = images[0];
      return `${apiUrl}/${image}`;
    }
    return '';
  };

  const renderItems = () =>
    props.products?.product.map((product, index) => (
      <tr key={index}>
        <td>
          <img
            style={{ width: '70px' }}
            src={renderCartImage(product.images)}
            alt=""
          />
        </td>
        <td>{product.quantity} EA</td>
        <td>$ {product.price}</td>
        <td>
          <button type="button">Remove</button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
