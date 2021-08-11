const username = 'admin';
const password = 'password';

describe("Test Login and Dashboard", () => {
    beforeEach(() => {
      cy.visit('/')
    });    

    it('displays errors on login', () => {
      cy.get('input[name=username]').type(username)
      cy.get('input[name=password]').type('passw0rd{enter}')
      cy.wait(1000)
      cy.get('div.formErrors')
      .should('be.visible')
      .and('contain', 'USERNAME and/or PASSWORD is not authorized.')
      cy.url().should('include', '/')
    })

    it("Can fill and submit the Login form", () => {
      cy.get("form")
      cy.get('input[name="username"]').type(username)
      cy.get('input[name="password"]').type(password)
      cy.get("form").submit()
    });

    it("Login redirects to dashboard on Success", () => {
      cy.get('input[name=username]').type(username)
      cy.get('input[name=password]').type(`${password}{enter}`)
      cy.url().should('include', '/dashboard')
      cy.get('nav.navBar').should('be.visible')
      cy.get('div.cardDeck').should('be.visible')
      cy.get('nav.fixed-bottom').should('be.visible')
    });
});

describe("Test Dashboard features", () => {
  // Login
  beforeEach(() => {
      cy.visit('/')
      cy.get('input[name=username]').type(username)
      cy.get('input[name=password]').type(`${password}{enter}`)
      cy.wait(1000)
  });

  it("Redirected to dashboard", ()=>{
      cy.url().should('include', '/dashboard')
  });

  it("Test Nav Header and Filter", ()=>{
      cy.get('nav.navBar').should('be.visible')
      cy.get('.navbar-nav').children().should('have.length', 2)
      // Test Filter logic
      cy.get('.btn-filter').contains('Filter')
      cy.get('.btn-filter').click()
      cy.get('.modal-content').should('be.visible')
      cy.get('.category-list').should('be.visible')
      cy.get('.category-list>li').first().find('div.dropdown>button').click()
      cy.get('.dropdown-menu').children('.active').next().click()
      cy.get('input[name=query]').type('coronavirus')
      cy.get('button.close').click()
      cy.wait(1000)
      cy.get('div.cardDeck>div.row>div.col').first().find('button').click()
      cy.wait(1000)
      cy.get('.navbar-text').find('a').should('have.attr', 'href', '/')
      cy.get('.navbar-text').find('a').contains('admin')
      cy.get('.navbar-text').find('a').click()
      cy.wait(500)
      cy.url().should('eq', 'http://localhost:3000/')
  });

  it("Test Read Now", ()=>{
      cy.get('nav.navBar').should('be.visible')
      cy.get('.navbar-nav>a').first().next().click()
      cy.wait(1000)
      cy.url().should('include', '/readNow')
      cy.get('.navbar-nav').children().should('have.length', 1)
      cy.get('div.card-deck').should('be.visible')
      cy.wait(1000)
      cy.get('.navbar-text').find('a').click()
      cy.wait(500)
      cy.url().should('eq', 'http://localhost:3000/')
  });
});