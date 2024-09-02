import express from 'express';
import * as utils from "./utils.js"
import {sendEmail} from "./email.js";
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
    logger.info("hasPercentDiff", hasPercentDiff)

    if(hasPercentDiff) await sendEmail();
}

setInterval(main, config.app.THIRTY_SEC_IN_MS);
