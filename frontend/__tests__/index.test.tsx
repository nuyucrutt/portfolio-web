import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index';

test('renders portfolio title', () => {
  render(<Home />);
  expect(screen.getByText('My Portfolio')).toBeInTheDocument();
});