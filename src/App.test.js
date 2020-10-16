import React from 'react'
import { render } from '@testing-library/react'
import TreeShowcase from './App'

test('renders learn react link', () => {
  const { getByText } = render(<TreeShowcase />)
})
