import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';


const HomeHeader = styled.div`
  width: 100%;
  display: flex;
  background: #999;
  color: #FFF;
  font-family: Verdana;
  align-content: center;
  justify-content: center;
  position: relative;
  height: 60px;

  .visually-hidden {
    clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
  }

  h1 {
    margin: 10px 0;
    font-weight: 400;
  }

  a {
    padding: 5px;
    position: absolute;
    top: 50%;
    border: solid 2px #FFF;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    transform: translateY(-50%);
    right: 5%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    text-decoration: none;
    text-transform: uppercase;
    font-size: .8rem;
    color: #FFF;

    &::before {
      content: "+";
      font-size: 1.8rem;
      line-height: 2.2rem;
    }
  }
`;

const HomeFilter = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  position: relative;

  > input {
    width: 100%;
    border: solid 1px #999;
    border-radius: 0;
    padding: 10px;
  }
`;

const HomeContainer = styled.div`
  width: 100%;
  padding: 20px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  li {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 1px solid #CCC;
    padding-bottom: 20px
  }
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

const SearchClose = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  right: 20px;
  bottom: 20px;

  > button {
    width: 37px;
    height: 38px;
    border: solid 1px #999;
    background: #FFF;
    padding: 0;
    margin: 0;
  }
`;

const Home = () => {
  const reviewsList = JSON.parse(window.localStorage.getItem('savedReviews'))?.reviews;
  const [ genre, setGenre ] = useState('');
  const [ displaySearchRemove, setDisplaySearchRemove] = useState(false);
  const [ filteredList, setFilteredList ] = useState(reviewsList || []);

  const onGenreChange = (genreText) => {
    if (!genreText) {
      setFilteredList(reviewsList);
      setDisplaySearchRemove(false);
    } else {
      setDisplaySearchRemove(true);
    }

    setGenre(genreText);
    const newReviewsList = reviewsList.filter(item => {
      const genreListConvertedToLowerCase = item.extraInfo.genres.map(item => item.toLowerCase());
      if ( genreListConvertedToLowerCase.includes(genreText.toLowerCase()) ) return true;

      return false;
    });

    if (!newReviewsList.length) return;

    setFilteredList(newReviewsList);
  };

  const onGenderTermRemove = () => {
    setGenre('');
    setDisplaySearchRemove(false);
    setFilteredList(reviewsList);
  }

  return (
    <>
      <HomeHeader>      
        <h1>Film log</h1>
        <Link to="/add">
          <span className="visually-hidden">add</span>
        </Link>
      </HomeHeader>
      <HomeFilter>
        <input type="text" value={genre} onChange={(e) => onGenreChange(e.target.value)} placeholder="Filter by genre" />
        <SearchClose {...(displaySearchRemove && { show: true })}>
          <button type="button" onClick={() => onGenderTermRemove()}>X</button>
        </SearchClose>
      </HomeFilter>
      <HomeContainer>
      <ul>
        {reviewsList 
        ? filteredList.map(({ id, movieTitle, extraInfo, text }) => (
          <li key={id}>
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
              <Link to={`/review/${id}`}>
                <span>Read more</span>
              </Link>
            </ItemReview>
          </li>
        ))
        : 'Sorry, no reviews yet!'
        }
      </ul>
      </HomeContainer>
    </>
  )
};

export default Home;
