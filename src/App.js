import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LetterLadder } from './pages';
import { LetterIntersection } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LetterLadder />} />
        <Route path="/letterIntersection" element={<LetterIntersection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
