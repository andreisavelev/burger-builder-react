import { Server, Model } from "miragejs";

export const mockIngredients = {
  test: 1,
};

export default function () {
  return new Server({
    routes() {
      this.urlPrefix = "https://react-my-burger-61200.firebaseio.com/";
      this.get("/ingredients.json", () => {
        return mockIngredients;
      });
    },
  });
}
