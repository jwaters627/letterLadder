import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { LetterLadder } from './pages';
import { LetterIntersection } from './pages';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LetterLadder />} />
        <Route path="/letterIntersection" element={<LetterIntersection />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
