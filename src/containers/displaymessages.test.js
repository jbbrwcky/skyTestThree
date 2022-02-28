import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { store } from '../store';
import DisplayMessages from './displaymessages';

const getTarget = () =>
  render(
    <Provider store={store}>
      <Router>
        <DisplayMessages />
      </Router>
    </Provider>
  );

describe('<DisplayMessages />', () => {
  it('should display messages from the API call', () => {
    const { getByText } = getTarget();
    expect(getByText((content, _) => content.includes("Integer non velit."))).toBeTruthy();
  });

  it('should display names on the messages', () => {
    const { getByText } = getTarget();
    expect(getByText("Helen Hawkins")).toBeInTheDocument();
  });
});
