import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sobre from './Sobre';

test('tela Sobre deve ser renderizada', () => {
  render(<Sobre />);
  expect(screen.getByText('Sobre Nós')).toBeInTheDocument();
});

