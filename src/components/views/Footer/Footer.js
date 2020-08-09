import React from 'react';
import { SmileOutlined } from '@ant-design/icons';

export default function Footer() {

  return (
    <div
      style={{
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
      }}
    >
      <p>
        Happy Codding <SmileOutlined />
      </p>
    </div>
  );
}
