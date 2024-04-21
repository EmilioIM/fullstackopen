import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

// Mockeando el módulo blogService
jest.mock('../services/blogs', () => ({
  update: jest.fn().mockResolvedValue({}),
}))

describe('Blog component tests', () => {
  test('renders title and author', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'author test',
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText(
      'Component testing is done with react-testing-library'
    )
    const element2 = screen.getByText('author test')
    expect(element).toBeDefined()
    expect(element2).toBeDefined()
  })

  test('renders URL and likes', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'author test',
      url: 'www.test.com',
      likes: 33,
    }

    render(<Blog blog={blog} />)

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

  test('like button is clicked twice', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'author test',
      url: 'www.test.com',
      likes: 33,
    }

    // Mock de la función updateBlog que se supone actualiza el estado en el componente padre
    const mockUpdateBlog = jest.fn()

    render(<Blog blog={blog} updateBlog={mockUpdateBlog} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    // Verificar que el botón "like" ha sido clickeado dos veces
    // Esta parte depende de cómo se actualiza la UI en respuesta a los clics
    // Si la UI no se actualiza directamente (espera respuesta de API), esto podría no reflejarse aquí
    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
    // Además, si tu componente actualiza visualmente el conteo de likes en la UI y puedes mockearlo apropiadamente,
    // puedes intentar verificar el nuevo valor de likes mostrado
  })
})
