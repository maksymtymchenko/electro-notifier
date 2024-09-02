import * as utils from "./utils.js"
import {sendEmail} from "./email.js";
import {config} from "./config.js";
import {logger} from "./logger.js";

async function main() {
    const data = await utils.getData();

    const messages = utils.getCorrectData(data);

    const secondGroupData = utils.filterByGroup(messages, 'Група 2');

    const hasPercentDiff = await utils.checkPercentDiff(secondGroupData);
    logger.info("hasPercentDiff", hasPercentDiff)

    if(hasPercentDiff) await sendEmail();
}

setInterval(main, config.app.THIRTY_SEC_IN_MS);
