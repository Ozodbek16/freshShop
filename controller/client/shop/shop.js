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
  checkout: async (req, res) => {
    res.render("checkout", {
      title: "Checkout",
    });
  },
  myAccount: async (req, res) => {
    res.render("my-account", {
      title: "My account",
    });
  },
  wishlist: async (req, res) => {
    res.render("wishlist", {
      title: "wishlist",
    });
  },
};
