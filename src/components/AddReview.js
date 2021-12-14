import React, { useEffect, useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const AddHeader = styled.div`
  width: 100%;
  display: flex;
  background: #999;
  color: #FFF;
  font-family: Verdana;
  align-content: center;
  justify-content: center;
  position: relative;
  height: 60px;
  justify-content: flex-end;
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
    margin-right: 5%;
    position: relative;

    &::before {
      content: "X";
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
      font-size: 30px;
      line-height: 30px;
      transform: translateY(-50%);
    }
  }
`;

const AddContainer = styled.div`
  width: 100%;
  padding: 20px;

  > form {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    > button[type="submit"] {
      padding: 10px;
      background: #FFF;
      border-radius: 0;
      text-transform: uppercase;
    }
  }
`;

const Search = styled.div`
  position: relative;

  > input {
    width: 100%;
    padding: 10px;
    border: solid 1px #999;
    border-radius: 0;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  display: ${props => props.show ? 'flex' : 'none'};
  background: #FFF;
  border: 1px solid #CCC;
  max-height: 300px;
  overflow-y: scroll;

  > ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

const SearchClose = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  right: 0;
  bottom: 0;

  > button {
    width: 37px;
    height: 38px;
    border: solid 1px #999;
    background: #FFF;
    padding: 0;
    margin: 0;
  }
`;

const TextAreaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AddReview = ({ movies }) => {
  const initialStoredReview = JSON.parse(window.localStorage.getItem('savedReviews'))?.reviews;

  const [ searchText, setSearchText ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ displaySearchRemove, setDisplaySearchRemove] = useState(false);
  const [ reviewText, setReviewText ] = useState('');
  const [ selectedTitle, setSelectedTitle ] = useState('');
  const [ reviews, setReviews ] = useState(initialStoredReview || []);
  const [ extraInfo, setExtraInfo ] = useState({});

  const reviewsCache = useMemo(() => {
    return {
      moviesList: movies,
      reviews: [...reviews],
    }
  }, [reviews, movies]);

  const onSearchText = (textToMatch) => {
    setSearchText(textToMatch);

    if (!textToMatch) {
      setSearchResults([]);
      return '';
    };

    const regex = new RegExp(textToMatch, 'gi');
    const result = movies.filter(item => !!item.title?.match(regex));

    setSearchResults(result);
    setDisplaySearchRemove(false);
  };

  const onResultSelection = (selectedMovie) => {

    const { 
      title, 
      genres, 
      release_year, 
      image_url,
      cast,
    } = selectedMovie;

    setSearchText(title);
    setSearchResults([]);
    setDisplaySearchRemove(true);
    setSelectedTitle(title);

    const reviewExtraInfo = {
      genres,
      release_year,
      image_url,
      director: cast[0].name,
    }
    setExtraInfo(reviewExtraInfo);
  };

  const onSearchTermRemove = () => {
    setSearchText('');
    setDisplaySearchRemove(false);
  }

  const onAddReviewSubmit = (e) => {
    e.preventDefault();

    if (!selectedTitle || !reviewText) return;

    const newReview = {
      id: new Date().getTime(),
      movieTitle: selectedTitle,
      text: reviewText,
      extraInfo,
    };

    reviewsCache.reviews.push(newReview);
    setReviews(reviewsCache.reviews);

    setSearchText('');
    setReviewText('');
    setDisplaySearchRemove(false);
  }

  useEffect(() => {
    window.localStorage.setItem('savedReviews', JSON.stringify(reviewsCache));
  }, [reviews, reviewsCache]);
  
  return (
    <>
      <AddHeader>
        <Link to="/">
          <span className="visually-hidden">back to homepage</span>
        </Link>
      </AddHeader>
      <AddContainer>
        <form>
          <Search>
            <label htmlFor="filmSearch">Film </label><br />
            <input
              id="filmSearch" 
              type="text" 
              placeholder="Search by film title" 
              value={searchText} 
              onChange={(e) => onSearchText(e.target.value)} 
            />
            <SearchClose {...(displaySearchRemove && { show: true })}>
              <button type="button" onClick={() => onSearchTermRemove()}>X</button>
            </SearchClose>
            
            <SearchResults {...(searchResults.length && { show: true })}>
              <ul>
                {
                  searchResults.length && searchResults.map((item) => (
                    <li key={item.id}>
                      <input 
                      type="radio" 
                      id={item.id} 
                      name="filmSelection" 
                      onChange={() => onResultSelection(item)} />
                      <label htmlFor={item.id}>{item.title}</label>
                    </li>
                  ))
                }
              </ul>
            </SearchResults>
          </Search>
          <TextAreaContainer>
            <label htmlFor="reviewText">Review text</label>
            <textarea id="reviewText" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          </TextAreaContainer>
          <button type="submit" onClick={(e) => onAddReviewSubmit(e)}>Save</button>
        </form>
      </AddContainer>
    </>
  )
};

export default AddReview;
