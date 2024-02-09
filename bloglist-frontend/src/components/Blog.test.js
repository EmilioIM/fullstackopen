import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author test',
    // URL: 'URL de test',
    // likes: 3
  }

  render(<Blog blog={blog}/>)

  const element = screen.getByText('Component testing is done with react-testing-library')
  const element2 = screen.getByText('author test')
  expect(element).toBeDefined()
  expect(element2).toBeDefined()
})