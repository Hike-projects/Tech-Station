import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the Home page of your application.</p>
      <Link to="/">Go to Counter Page</Link>
    </div>
  );
};

export default Home;
