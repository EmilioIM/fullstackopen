import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('BlogForm', () => {
  test('calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlogMock = jest.fn()
    render(<BlogForm createBlog={createBlogMock} />)

    const user = userEvent.setup()

    const inputTitle = screen.getByPlaceholderText('Título')
    const inputUrl = screen.getByPlaceholderText('URL')
    const saveButton = screen.getByText('save')

    await user.type(inputTitle, 'Testing with Jest')
    await user.type(inputUrl, 'https://jestjs.io')
    await user.click(saveButton)

    expect(createBlogMock).toHaveBeenCalledWith({
      title: 'Testing with Jest',
      author: '', // Dado que no hemos llenado este campo, se espera que sea una cadena vacía
      url: 'https://jestjs.io',
    })
  })
})
