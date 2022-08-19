const { Telegraf } = require("telegraf");
const arr = [];
const bot = new Telegraf("5752137170:AAFqq2dL27PHW0ulrxtsRGu9QzgkUNcEZGw");

bot.start((ctx) => {
  if (arr.length == 0) {
    ctx.reply("Hello");
    arr.push(`${ctx.message.chat.id}`);
    ctx.reply("You is a admin");
  } else {
    ctx.reply("You is a not admin");
  }
});

bot.command("stop", (ctx) => {
  ctx.reply("Bot stoped!!");
  arr.pop();
});

bot.launch();

process.once("SIGINT", () => {
  bot.stop("SIGINT");
  arr.pop();
});
process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
  arr.pop();
});

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
  email: async (req, res) => {
    if (arr.length > 0) {
      bot.telegram.sendMessage(arr[arr.length - 1], req.body);
    }
    res.redirect("back");
  },
};
