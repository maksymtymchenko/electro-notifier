import 'dotenv/config'

export const config = {
    email: {
        user: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
        service: "gmail",
        port: 587,
        secure: false,
        host: "smtp.gmail.com",
    },
    app: {
        MAX_MESSAGE_DIFF_TIME: 2,
        ONE_MIN_IN_MS: 60_000,
        THIRTY_SEC_IN_MS: 30_000,
        MAX_PERCENT_DIFF: 3,
        TEN_MIN_IN_MS: 600_000,
    },
    tg: {
        TELEGRAM_CHANNEL: process.env.TELEGRAM_CHANNEL,
    },
    server: {
        PORT: process.env.PORT,
    },
    status: {
        ON: 'ON',
        OFF: 'OFF',
        NO: 'NO',
    }
}
