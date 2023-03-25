const TelegramBot = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options.js");
const token = "6130140599:AAF_UDVyRLz3wTeaBvT9yuDmXz1cfJAKaag";

const bot = new TelegramBot(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Now i am randomize integer for you from 0 to 9, you must answer, what is this"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Answer", gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Introduction hello" },
    { command: "/info", description: "Info command" },
    { command: "/game", description: "Play game" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "You write me");

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        `https://ant.combot.org/ss/programming/053c9d80a23ca4a7fa0ff65f9ab172c87b2fccbcdf1364584e7b8489806d3575d19df1c81e784862abc66169d71bc656f7d840e00233ed95ef333a855914c81780th.png`
      );
      return bot.sendMessage(
        chatId,
        "Great to see you in telegram bot from mamed"
      );
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Your name ${msg.from.first_name} ${msg.from.last_name}`
      );
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, "I dont understand you...");
  });

  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (data === chatId[chatId]) {
      return bot.sendMessage(
        chatId,
        `Congratulations, you are rigth! - ${chats[chatId]}`,
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `you are wrong... ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
