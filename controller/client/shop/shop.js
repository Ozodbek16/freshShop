module.exports = {
  shop: async (req, res) => {
    res.render("shop", {
      title: "Shop",
    });
  },
  shopDetail: async (req, res) => {
    res.render("shop-detail", {
      title: "Shop detail",
    });
  },
  cart: async (req, res) => {
    res.render("cart", {
      title: "Cart",
    });
  },
};
