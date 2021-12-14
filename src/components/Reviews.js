import React from 'react';
import styled from '@emotion/styled';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, useSelector } from 'react-redux';

const ShowHeader = styled.div`
  width: 100%;
  display: flex;
  background: #999;
  color: #FFF;
  font-family: Verdana;
  align-content: center;
  justify-content: center;
  position: relative;
  height: 60px;
  justify-content: space-between;
  position: relative;
  height: 60px;
  align-items: center;
  align-content: center;
  flex-wrap: nowrap;
  flex-direction: row;

  .visually-hidden {
    clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
  }

  > a {
    color: #FFF;
    text-decoration: none;
    padding-left: 20px;
    position: relative;

    &::before {
      content: "<";
      position: absolute;
      top: 0;
      left: 20px;
      width: 30px;
      height: 30px;
      font-size: 30px;
      line-height: 30px;
      transform: translateY(-50%);
    }
  }

  > button {
    margin-right: 5%;
    position: relative;
    padding: 0;
    border: none;
    width: 30px;
    height: 30px;
    background: transparent;

    &::before {
      content: '🗑️';
      position: absolute;
      top: 50%;
      right: 0;
      width: 30px;
      height: 30px;
      font-size: 30px;
      line-height: 30px;
      transform: translateY(-50%);
    }

    &:focus {
      outline: solid 2px #CCC;
      outline-offset: 2px;
      background-blend-mode: difference;
      text-shadow: 1px 0px 11px black;
    }
  }
`;

const ShowContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const deleteReducer = (
  state = { 
    reviewToDelete: null,
  }, 
  action,
) => {
  switch (action.type) {
    case "delete":
      return {
        ...state,
        reviewToDelete: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(deleteReducer);

const TheReviews = () => {
  const navigate = useNavigate();
  const dropId = useSelector(state => state.reviewToDelete);

  const onDeleteClick = () => {
    if (!dropId.reviewToDelete) return;

    const storedReviews = JSON.parse(window.localStorage.getItem('savedReviews'));

    const reviewsList = storedReviews?.reviews;
    let foundIndex = null;
    
    reviewsList.forEach( (item, index) => {
      if (`${item.id}` === `${dropId.reviewToDelete}`) {
        foundIndex = index;
      }
    })

    reviewsList.splice(foundIndex, 1);

    window.localStorage.setItem('savedReviews', JSON.stringify(storedReviews));
    navigate('/');
  }

  return (
    <div>
    <ShowHeader>
      <Link to="/">
        <span className="visually-hidden">back</span>
      </Link>
      <button type="button" onClick={() => onDeleteClick()}>
        <span className="visually-hidden">delete</span>
      </button>
    </ShowHeader>
    <ShowContainer>
      <Outlet />
    </ShowContainer>
    </div>
  )
};

const Reviews = () => <Provider store={store}> <TheReviews /> </Provider>;

export default Reviews;
