module.exports = {
  home: async (req, res) => {
    res.render("admin/index", {
      title: `${process.env.admin_url}`,
      layout: 'admin'
    });
  },
};
