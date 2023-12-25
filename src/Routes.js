import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import Cart from './components/Cart/cart'
import Detail from './components/Detail/detail';

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="detail/:id" element={<Detail />} />
    </Routes>
  );
}
