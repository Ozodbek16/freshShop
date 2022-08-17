module.exports = {
  home: (req, res) => {
    res.render("index", {
      title: "",
    });
  },
  about: async (req, res) => {
    res.render("about", {
      title: "About",
    });
  },
};
