const { clone, findOfficesInRange } = require("./home");

describe("run moopay test", () => {
  it("should deep clone object supplied", () => {
    const originalObject = {
      name: "Paddy",
      address: { town: "Lerum", country: "Sweden" },
    };
    const clonedObject = clone(originalObject);

    expect(originalObject).toEqual(clonedObject);
  });

  it("should get offices within 100km of central London", () => {

    //file path for list of partners
    const partners = require("./partners.json")
    expect(partners.length).toBeGreaterThan(0);

    const officesInRange = findOfficesInRange(partners)
    console.log(officesInRange)
    expect(officesInRange.length).toBeGreaterThan(0)
  });
});
