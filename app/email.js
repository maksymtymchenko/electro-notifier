import nodemailer from "nodemailer";
import {config} from "./config.js";
import {logger} from "./logger.js";
import * as utils from "./utils.js";



const transporter = nodemailer.createTransport({
    service: config.email.service,
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
        user: config.email.user,
        pass: config.email.password,
    },
});

let isSending = false;

export async function sendOffEmail() {
    const emailData = utils.generateEmailMsg("Electricity will be turned off soon")

    if(!isSending) {
        const info = await transporter.sendMail(emailData);
        isSending = true;
        logger.info('Successfully send email', isSending);
    }

    const timeoutID = setTimeout(() => {
        isSending = false;
    }, config.app.TEN_MIN_IN_MS);

    // clearTimeout(timeoutID);
}

export async function sendOnEmail() {
    const emailData = utils.generateEmailMsg("Electricity will be turned on soon")

    if(!isSending) {
        const info = await transporter.sendMail(emailData);
        isSending = true;
        logger.info('Successfully send email', isSending);
    }

    const timeoutID = setTimeout(() => {
        isSending = false;
    }, config.app.TEN_MIN_IN_MS);

    // clearTimeout(timeoutID);
}
