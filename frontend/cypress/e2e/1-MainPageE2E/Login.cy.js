describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Login correctly", () => {
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.intercept("POST", "/api/auth", {
      statusCode: 200,
      body: {
        success: true,
      },
      headers: {
        "content-type": "application/json",
      },
    }).as("authRequest");
    cy.intercept("GET", "/api/auth", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: "User verified successfully",
        },
        headers: {
          "content-type": "application/json",
        },
      });
    }).as("loginRequest");
    cy.get(".form").submit();
    cy.wait("@authRequest");
    cy.wait("@loginRequest");
    cy.url().should("include", "/main");
  });
  it("Login fails", () => {
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.intercept("POST", "/api/auth", {
      statusCode: 400,
      body: {
        errors: [{ msg: "Invalid credentials" }],
      },
      headers: {
        "content-type": "application/json",
      },
    }).as("authRequest");
    cy.get(".form").submit();
    cy.wait("@authRequest");
    cy.url().should("include", "/login");
    cy.contains(".alert-danger", "Invalid credentials").should("be.visible");
  });
});
