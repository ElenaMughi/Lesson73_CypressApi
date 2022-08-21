describe("User API", () => {
  it("Should add User", () => {
    cy.fixture("people.json").then((user) => {
      cy.request({
        method: "POST",
        url: "https://petstore.swagger.io/v2/user",
        body: user[0],
      }).then((response) => {
        // cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
      });
    });
  });

  it("Should update User", () => {
    let body;
    cy.fixture("people.json").then((selector) => {
      let name = selector[1].username;

      cy.request({
        method: "POST",
        url: "https://petstore.swagger.io/v2/user",
        body: selector[1],
      }).then((response) => {
        body = response.body;
      });

      cy.request({
        method: "PUT",
        url: "https://petstore.swagger.io/v2/user/" + name,
        body: {
          id: 32,
          username: "Lilith",
        },
      }).then((response) => {
        // cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.eq(body);
      });
    });
  });

  it("Should delete User", () => {
    cy.fixture("people.json").then((selector) => {
      let name = selector[2].username;

      cy.request({
        method: "POST",
        url: "https://petstore.swagger.io/v2/user",
        body: selector[2],
      }).then((response) => {
        expect(response.status).to.eq(200);
      });

      cy.request({
        method: "DELETE",
        url: "https://petstore.swagger.io/v2/user/" + name,
      }).then((response) => {
        // cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
      });
    });
  });

});
