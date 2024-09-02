import nodemailer from "nodemailer";
import {config} from "./config.js";
import {logger} from "./logger.js";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

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

const emailData = {
    from: '"Electro Notifier ⚡" <makstimchenk@gmail.com>',
    to: "makstimchenk@gmail.com",
    subject: "Electro Notifier ⚡",
    text: "Electricity will be turned off soon",
    attachments: [
        {
            filename: "ahh.jpeg",
            path: __dirname + "/img/ahh.jpeg",
        }
    ]
}

let isSending = false;

export async function sendEmail() {
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
