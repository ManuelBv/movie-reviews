import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import Home from './components/Home';
import Reviews from './components/Reviews';
import AddReview from './components/AddReview';
import IndividualReview from './components/IndividualReview';

import { MUBI_API_URL } from './utils/constants';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 0;
  background: #F2F2F2;
  padding-bottom: 20px;
  
  * {
    box-sizing: border-box;
    font-family: Verdana;
  }
`;

const AppContent = styled.div`
  width: clamp(300px, 80%, 1000px);
  background: #FFF;
  color: #000;
`;

const App = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(MUBI_API_URL);
      setMovies(data);
    };

    fetchData();
  }, []);

  return (
    <AppWrapper>
      <img src={logo} width="100px" alt=""/>
      <AppContent>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="review" element={<Reviews />}>
                <Route path=":id" element={<IndividualReview />} /> 
              </Route>
              <Route path="/add" element={<AddReview movies={movies} />} />
            </Routes>
        </BrowserRouter>
      </AppContent>
    </AppWrapper>
  )
};

export default App;
