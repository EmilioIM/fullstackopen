describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      name: 'Emilio Iglesias',
      username: 'Emilianoje',
      password: '1234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user2 = {
      name: 'Rosa Melano',
      username: 'rosame',
      password: '1234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
    cy.visit('')
  })

  it('front page can be opened and show login', function() {
    cy.contains('login')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('Emilianoje')
    cy.get('#password').type('1234')
    cy.get('#login-button').click()

    cy.contains('Emilio Iglesias logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      const user = {
        name: 'Emilio Iglesias',
        username: 'Emilianoje',
        password: '1234',
      }
      cy.login(user)
      cy.createBlog({ title:'blog 1', url:'www.url1.com', author:user.name })
      cy.createBlog({ title:'blog 2', url:'www.url2.com', author:user.name })
      cy.createBlog({ title:'blog 3', url:'www.url3.com', author:user.name })
    })

    it('a new blog can be created', function() {
      const blogData = {
        title: 'a blog created by cypress',
        url: 'www.cypresstesting.com',
        author: 'Emilio Iglesias' }
      cy.createBlog(blogData)
      cy.contains(blogData.title)
    })

    it('a blog can be liked', function(){
      const blogData = {
        title: 'a blog created by cypress',
        url: 'www.cypresstesting.com',
        author: 'Emilio Iglesias'
      }
      cy.createBlog(blogData)

      cy.contains(blogData.title)
        .contains('view')
        .click()

      cy.contains(blogData.title)
        .contains('like')
        .click()

      cy.contains('1')
    })

    it('a blog can be deleted', function(){
      const blogData = {
        title: 'a blog created to be deleted',
        url: 'www.cypresstesting.com',
        author: 'Emilio Iglesias'
      }
      cy.createBlog(blogData)

      cy.contains(blogData.title)
        .contains('view')
        .click()

      cy.contains(blogData.title)
        .contains('remove')
        .click()

    })
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('Emilianoje')
    cy.get('#password').type('1235')
    cy.get('#login-button').click()

    cy.get('.error').contains('Error: ')

    cy.get('html').should('not.contain', 'Emilio Iglesias logged in')
  })
})