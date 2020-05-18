import {
  purchaseInit,
  purchaseBurger,
  purchaseBurgerSuccess,
  purchaseBurgerFail,
  purchaseBurgerStart,
  fetchOrderStart,
  fetchOrdersSuccess,
  fetchOrdersFailed,
} from "../order";
import {
  PURCHASE_BURGER,
  PURCHASE_INIT,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILED,
} from "../actionTypes";

describe("Order actions", () => {
  it("should contains type PURCHASE_INIT", () => {
    expect(purchaseInit().type).toEqual(PURCHASE_INIT);
  });

  it("should returns the correct type and a payload", () => {
    const orderData = { salad: 1, seeds: 2, meat: 1 };
    const token = "test";

    expect(purchaseBurger(orderData, token)).toEqual({
      type: PURCHASE_BURGER,
      payload: {
        orderData,
        token: "test",
      },
    });
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

  it("should returns correct type and order data after the fetchOrdersSuccess call", () => {
    const orders = [{ id: 1 }, { id: 2 }];

    expect(fetchOrdersSuccess(orders)).toEqual({
      type: FETCH_ORDERS_SUCCESS,
      orders,
    });
  });

  it("should returns correct type and error after the fetchOrdersFailed call", () => {
    const error = { test: "test" };
    expect(fetchOrdersFailed(error)).toEqual({
      type: FETCH_ORDERS_FAILED,
      error,
    });
  });
});
