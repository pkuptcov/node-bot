const TelegramBot = require('node-telegram-bot-api');
const puppeteer = require('puppeteer');
const token = '595308349:AAE9f0xyzRWc21o0jLlbiB5ixXgiQB8ilkA';
const bot = new TelegramBot(token, {polling: true});
const chatId = 318882951;

function testConnection () {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const startTime = new Date().getTime();

        page.on('load', () => {
            const endTime = new Date().getTime();
            const loadTime = endTime - startTime;
			loadTime < 60000 ? bot.sendMessage(chatId, loadTime / 1000) : bot.sendMessage(chatId, 'Загрузка сайта Петрович более 60 секунд');
        });

        await page.goto('https://petrovich.ru');
		// await page.screenshot({path: 'mainPetrovich.png'});
        await browser.close();
        await renewTest();
    })();
};

function renewTest () {
    setTimeout(function () {
        testConnection();
    }, 10000);
}

testConnection();