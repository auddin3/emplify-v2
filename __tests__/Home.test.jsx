import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import { useRouter } from 'next/navigation'
import Provider from '../src/app/provider'

jest.mock('next/navigation', () => ({useRouter: jest.fn()}))

// describe('Home', () => {
//   it('renders a heading', () => {
//     useRouter.mockReturnValue({push: jest.fn()})

//     render(
//       <Provider>
//         <Home />
//       </Provider>,
//     )

//     const heading = screen.getByRole('heading', { level: 1 })
//     expect(heading).toBeInTheDocument()
//   })
// })
