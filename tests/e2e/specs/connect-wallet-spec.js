const to_address = "0x9B64C71f9fb4B5AfA1fd324C5848d80631EE9Aff";
const value = "0.001";

describe("Wallet tests", () => {
  before(() => {});
  context("Connect metamask wallet", () => {
    it("should login with success", () => {
      cy.visit("/");

      cy.get("#connect-btn").then(($connectBtn) => {
        $connectBtn.trigger("click");
        cy.acceptMetamaskAccess();
        cy.get("#toAddress").type(to_address);
        cy.get("#value").type(value);
        cy.get("#sendBtn").should("be.enabled").click();
        cy.confirmMetamaskTransaction();
        cy.get("#txHash").should("be.visible");
      });
    });
  });
});
