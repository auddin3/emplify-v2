import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import Home from '../src/app/page'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  })),
}));

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Home />
      </ChakraProvider>
    );
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  });
});
