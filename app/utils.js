import {telegram_scraper} from "telegram-scraper";
import {config} from "./config.js";
import {logger} from "./logger.js";

export const getData = async () => {
    try {
        const result = await telegram_scraper(config.tg.telegramChannel);

        if (!result) {
            logger.error(`Telegram scraper not found: ${result}`);
            return;
        }

        return JSON.parse(result);
    } catch (e) {
        throw e;
    }
}


export const filterByGroup = (data, groupName) => {
    const regex = new RegExp(`${groupName}: (\\d+)% (\\d{2}:\\d{2})`);
    return data.map(message => {
        const match = message.message.match(regex);
        return match ? `${groupName}: ${match[1]}% ${match[2]}` : null;
    }).filter(info => info !== null).slice(-5);
};


export const extractPercentage = (str) => {
    const match = str.match(/(\d+)%/);
    return match ? parseInt(match[1], 10) : null;
};

export const checkPercentDiff = async (data) => {
    for (let i = 1; i < data.length; i++) {
        const prevPercent = extractPercentage(data[i - 1]);
        const currPercent = extractPercentage(data[i]);

        if(!prevPercent || !currPercent) {
            logger.error('No percents found in Data');
        }

        if ((prevPercent - currPercent) >= config.app.MAX_PERCENT_DIFF) {
            return true;
        }
    }

    return false;
}

export const getDifferenceInMinutes = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    const differenceInMilliseconds = currentDate - givenDate;

    return Math.floor(differenceInMilliseconds / 1000 / 60);
};

export const getCorrectData = data => {
    return data.filter(item => getDifferenceInMinutes(item.datetime) <= config.app.MAX_MESSAGE_DIFF_TIME)
        .map(item => {
        return {
            message: item.message_text,
            date: item.datetime
        }
    });
}
