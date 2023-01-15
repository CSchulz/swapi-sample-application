export const Main = {
  Menu: {
    Welcome: () => cy.get('app-navigation mat-sidenav-container mat-nav-list a:nth-child(1)'),
    Character: () => cy.get('app-navigation mat-sidenav-container mat-nav-list a:nth-child(2)'),
    Planets: () => cy.get('app-navigation mat-sidenav-container mat-nav-list a:nth-child(3)'),
  }
}

export const Character = {
  Title: () => cy.get('h2'),
  Table: {
    Paginator: () => cy.get('mat-paginator'),
    PaginatorPages: () => Character.Table.Paginator().get('.mat-mdc-paginator-range-label'),
    PaginatorNextPage: () => Character.Table.Paginator().get('button:nth-child(3)')
  }
}
