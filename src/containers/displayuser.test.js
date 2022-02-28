import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router';
import { render } from '@testing-library/react';
import { store } from '../store';
import DisplayUser from './displayuser';

const getTarget = () =>
  render(
    <Provider store={store}>
      <Router>
        <DisplayUser />
      </Router>
    </Provider>);

describe('<DisplayUser />', () => {
  it('should display the messages for a given user', () => {
    const { getByText } = getTarget();
    expect(getByText('')).toBeInTheDocument();
  });
});
