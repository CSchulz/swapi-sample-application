import {Character, Main} from "./page-object";

describe('Character List Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Visits the initial project page', () => {
    cy.contains('Welcome to our awesome SWAPI browser')
  })

  it ('open the character list page', () => {
    cy.intercept({
      method: 'GET',
      url: '**/api/people/?page=1&limit=1000',
    }).as('people');
    Main.Menu.Character().click();
    cy.wait('@people')
    Character.Title().contains('Characters');
    Character.Table.PaginatorPages().contains('1 – 10 of 82');
  })

  it ('open the character list page and navigates to second record page', () => {
    cy.intercept({
      method: 'GET',
      url: '**/api/people/?page=1&limit=1000',
    }).as('people');
    Main.Menu.Character().click();
    cy.wait('@people')
    Character.Title().contains('Characters');
    Character.Table.PaginatorNextPage().scrollIntoView();
    Character.Table.PaginatorNextPage().click();
    Character.Title().scrollIntoView()
    Character.Table.PaginatorPages().contains('11 – 20 of 82');
  })
})
