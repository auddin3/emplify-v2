// jest.setup.js
import '@testing-library/jest-dom'

// Polyfill `structuredClone` if needed
if (typeof global.structuredClone !== 'function') {
  global.structuredClone = obj => JSON.parse(JSON.stringify(obj))
}

// Mock `useRouter` globally if required by multiple tests
import { jest } from '@jest/globals'
jest.mock('next/navigation', () => ({useRouter: jest.fn().mockReturnValue({ push: jest.fn() })}))

// Mock `window.matchMedia`
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(), // Deprecated method, but some libraries still use it
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }
}
