import React from 'react';
import '../styles/core.css';
import './App.css';

import FloatLayout from './FloatLayout';
import FlexboxLayout from './FlexboxLayout';
import GridLayout from './GridLayout';

const Routes = () => (
  <div className="row">
    <FloatLayout />
    <FlexboxLayout />
    <GridLayout />
  </div>
);

export default Routes;
