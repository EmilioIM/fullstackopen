import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author test',
  }

  render(<Blog blog={blog}/>)

  const element = screen.getByText('Component testing is done with react-testing-library')
  const element2 = screen.getByText('author test')
  expect(element).toBeDefined()
  expect(element2).toBeDefined()
})

test('renders URL and likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author test',
    url: 'www.test.com',
    likes: 33
  }

  render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.getByTestId('blog-url')
  const likesElement = screen.getByTestId('blog-likes')

  expect(urlElement).toHaveTextContent('www.test.com')
  expect(urlElement).toBeVisible()
  expect(likesElement).toHaveTextContent('33')
  expect(likesElement).toBeVisible()
})