import {
  purchaseInit,
  purchaseBurgerSuccess,
  purchaseBurgerFail,
} from "../order";
import {
  PURCHASE_INIT,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
} from "../actionTypes";

describe("Order actions", () => {
  it("should contains type PURCHASE_INIT", () => {
    expect(purchaseInit().type).toEqual(PURCHASE_INIT);
  });

  it("should returns correct order data from purchaseBurgerSuccess action creator", () => {
    expect(purchaseBurgerSuccess("1", { test: "test" })).toEqual({
      orderId: "1",
      type: PURCHASE_BURGER_SUCCESS,
      orderData: { test: "test" },
    });
  });

  it("should returns correct type and error data", () => {
    const error = { test: "test" };
    expect(purchaseBurgerFail(error)).toEqual({
      type: PURCHASE_BURGER_FAIL,
      error,
    });
  });
});
