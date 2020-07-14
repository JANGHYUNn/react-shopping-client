import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// @param option
// null 아무상태에서 출입이 가능한 페이지
// true 로그인했을시만 보여지는 페이지
// false 로그인상태에서는 출입이 불가능한 페이지
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    // redux hook을 이용하여 userReducer 가져오기
    const user = useSelector(state => state.userReducer);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {});
    }, [dispatch]);

    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}
