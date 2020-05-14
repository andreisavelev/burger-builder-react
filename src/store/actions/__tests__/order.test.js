import { purchaseInit } from "../order";
import { PURCHASE_INIT } from "../actionTypes";

describe("Order actions", () => {
  it("should contains type PURCHASE_INIT", () => {
    expect(purchaseInit().type).toEqual(PURCHASE_INIT);
  });
});
