import {
  purchaseInit,
  purchaseBurgerSuccess,
  purchaseBurgerFail,
  purchaseBurgerStart,
  fetchOrderStart,
} from "../order";
import {
  PURCHASE_INIT,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  FETCH_ORDERS_START,
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

  it("should returns correct type and error data after purchaseBurgerFail", () => {
    const error = { test: "test" };
    expect(purchaseBurgerFail(error)).toEqual({
      type: PURCHASE_BURGER_FAIL,
      error,
    });
  });

  it("should returns correct type after purchaseBurgerStart call", () => {
    expect(purchaseBurgerStart()).toEqual({ type: PURCHASE_BURGER_START });
  });

  it("should returns correct type after the fetchOrderStart call", () => {
    expect(fetchOrderStart()).toEqual({ type: FETCH_ORDERS_START });
  });
});
