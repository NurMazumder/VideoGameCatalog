describe("MainPage Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Displays two slider", () => {
    cy.get(".home-page > :nth-child(1)").should("exist");
    cy.get(".home-page > :nth-child(2").should("exist");
  });
  it("Open modal when game card is clicked", () => {
    cy.get(
      ":nth-child(1) > .slider-table > tbody > tr > :nth-child(1)"
    ).click();
    cy.get(".modal-container").should("exist");
    cy.get("#modal-close-button").click();
    cy.get("GameInfoModal").should("not.exist");
  });
  it("Navigate to search page", () => {
    cy.contains("#view-link", "View More").click();
    cy.url().should("include", "/search");
    cy.get("tbody > tr > :nth-child(2)").click();
    cy.get(".modal-container").should("exist");
    cy.get("#modal-close-button").click();
    cy.get("GameInfoModal").should("not.exist");
  });
});
