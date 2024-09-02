# Email Notifier

Email Notifier is a tool designed to provide email notifications about electricity status. It monitors a Telegram channel that shows data for all 6 groups, parses the messages, and compares the percentage changes every minute. Based on the comparison, it sends email notifications such as "Electricity will be turned off soon."

## Tech Stack

- **Node.js**
- **Nodemailer**
- **Render** (used for deploying the service)
- **Express.js** (required by Render)
- **telegram-scraper** (used to parse the Telegram channel)
