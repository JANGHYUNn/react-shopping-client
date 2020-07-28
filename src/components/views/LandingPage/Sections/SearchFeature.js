import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState('');
  const searchHandler = e => {
    setSearchTerm(e.target.value);
    props.refleshFunction(e.target.value);
  };

  return (
    <div>
      <Search
        onChange={searchHandler}
        value={SearchTerm}
        placeholder="input search text"
        style={{ width: '200px' }}
      />
    </div>
  );
}

export default SearchFeature;
