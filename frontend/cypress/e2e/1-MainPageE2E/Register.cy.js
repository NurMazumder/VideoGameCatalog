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
    cy.wait(["@signupRequest", "@authRequest"]);
    cy.url().should("include", "/main");
  });
  it("Trying to sign up with invalid fields", () => {
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.intercept("POST", "/api/users", (req) => {
      req.reply({
        statusCode: 400,
        body: { errors: [{ msg: "Empty inputs" }] },
        headers: { "content-type": "application/json" },
      });
    }).as("signupRequest");
    cy.get(".form").submit();
    cy.wait(500);
    cy.get(".alert.alert-danger").should("be.visible");
    cy.get(".alert.alert-danger")
      .invoke("text")
      .then((alertText) => {
        expect(alertText.trim()).to.equal("Empty inputs");
      });
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("1");
    cy.intercept("POST", "/api/users", (req) => {
      req.reply({
        statusCode: 400,
        body: { errors: [{ msg: "Password length must be greater than 6" }] },
        headers: { "content-type": "application/json" },
      });
    }).as("signupRequest");
    cy.get(".form").submit();
    cy.wait(500);
    cy.get(".alert.alert-danger").should("be.visible");
    cy.get(".alert.alert-danger")
      .invoke("text")
      .then((alertText) => {
        expect(alertText.trim()).to.equal(
          "Password length must be greater than 6"
        );
      });
    cy.url().should("include", "/register");
  });
});
