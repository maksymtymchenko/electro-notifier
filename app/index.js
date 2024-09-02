import express from 'express';
import * as utils from "./utils.js"
import {sendOnEmail, sendOffEmail} from "./email.js";
import {config} from "./config.js";
import {logger} from "./logger.js";

const app = express();

const PORT = config.server.PORT || 3001;

app.get('/', (req, res) => {
    res.send("Hello! I'm Electro Notifier ⚡");
});

app.listen(PORT, () => {
    logger.info(`Server is running on ${PORT} port`);
});

async function main() {
    const data = await utils.getData();

    const messages = utils.getCorrectData(data);

    const secondGroupData = utils.filterByGroup(messages, 'Група 2');

    const hasPercentDiff = await utils.checkPercentDiff(secondGroupData);
    logger.info("Has percent difference:", hasPercentDiff)

    if(hasPercentDiff === config.status.OFF) await sendOffEmail();
    if(hasPercentDiff === config.status.ON) await sendOnEmail();
}

setInterval(main, config.app.THIRTY_SEC_IN_MS);
