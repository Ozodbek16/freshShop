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
  gallery: async (req, res) => {
    res.render("gallery", {
      title: "Gallery",
    });
  },
  contactUs: async (req, res) => {
    res.render("contact-us", {
      title: "Contact-us",
    });
  },
};
