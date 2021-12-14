import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ReviewContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const ItemTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: clamp(200px, 50%, 500px);

  > h3 {
    margin-top: 0;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;

  > img {
    width: clamp(200px, 30%, 500px);
  }
`;

const ItemReview = styled.div`
  display: flex;
  flex-direction: column;
`;

const IndividualReview = () => {
  const { id } = useParams();
  const reviewsList = JSON.parse(window.localStorage.getItem('savedReviews'))?.reviews;
  const [ review ] = reviewsList.filter(item => (`${item.id}` === `${id}`));

  const { movieTitle, text, extraInfo } = review;  

  const dispatch = useDispatch();

  useEffect (() => {
    dispatch({ 
      type: 'delete', 
      payload: {
        reviewToDelete: id,
      },
    });
  }, [dispatch, id]);

  return (
    <ReviewContainer>
      <ItemHeader>
        <ItemTitleContainer>
          <h3>{movieTitle}</h3>
          <span>{extraInfo.director}</span>
          <span>{extraInfo.release_year}</span>
          <span>{extraInfo.genres.join(', ')}</span>
        </ItemTitleContainer>
        <img src={extraInfo.image_url} alt="" />
      </ItemHeader>
      <ItemReview>
        <p>{text}</p>
      </ItemReview>
    </ReviewContainer>
  );
};

export default IndividualReview;
