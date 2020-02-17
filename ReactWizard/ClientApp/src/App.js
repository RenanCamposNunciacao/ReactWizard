import React from 'react';
import { Route } from 'react-router';
import Layout from './components/_Layout/Layout';
import Wizard from './components/Wizard/Wizard';

export default () => (
  <Layout>
    <Route exact path='/' component={Wizard} />
    <Route path='/fetch-user/:startIndex?' component={Wizard} />
  </Layout>
);
