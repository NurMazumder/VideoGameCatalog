describe("Signup", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Sign up correctly", () => {
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.intercept("GET", "/api/auth", {
      statusCode: 200,
      body: {
        success: true,
      },
      headers: {
        "content-type": "application/json",
      },
    }).as("authRequest");
    cy.intercept("POST", "/api/users", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: "User created successfully",
        },
        headers: {
          "content-type": "application/json",
        },
      });
    }).as("signupRequest");
    cy.get(".form").submit();
    cy.wait("@signupRequest");
    cy.wait("@authRequest");
    cy.url().should("include", "/main");
  });
});
