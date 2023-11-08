import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { LetterLadder } from './pages';
import { LetterIntersection } from './pages';

function App() {
  return (
    <HashRouter>
      <div>
        <a href="/">home</a>
        <a href="/#/letterIntersection">intersection</a>
      </div>
      <Routes>
        <Route path="/" element={<LetterLadder />} />
        <Route path="/letterIntersection" element={<LetterIntersection />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
