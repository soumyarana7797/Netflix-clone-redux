import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Banner from './Banner';
import Navbar from './Navbar';
import Row from './Row';

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    // <>
    <div className="homeScreen">
      {/* Nav */}
      <Navbar />

      {/* Banner */}
      <Banner />

      {/* Row */}

      <Row
        title="NETFLIX_ORIGINALS"
        fetchMethod="fetchNetflixOriginals"
        isLargeRow
      />
      <Row title="TRENDING MOVIES" fetchMethod="fetchTrendingMovies" />
      <Row title="TOP RATED MOVIES" fetchMethod="fetchTopRated" />
      {/* <Row title="ACTION MOVIES" fetchMethod="fetchActionMovies" />
      <Row title="COMEDY MOVIES" fetchMethod="fetchComedyMovies" />
      <Row title="HORROR MOVIES" fetchMethod="fetchHorrorMovies" />
      <Row title="TOP ROMANTIC MOVIES" fetchMethod="fetchRomanticMovies" />
      <Row title="DOCUMENTARY MOVIES" fetchMethod="fetchDocumentaryMovies" /> */}
    </div>
    // </>
  );
};

export default Home;
