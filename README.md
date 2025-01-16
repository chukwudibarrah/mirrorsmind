# Multi-issue comic book

This is a Nextjs-based multi-issue comic book with a touchscreen/keyboard-controlled page reader. It also includes a subscription form for MailChimp and a comments section for feedback.

The following instructions use npm but you can adjust for yarn, pnpm or bun as required.

# Installing

Copy to your local machine

git clone https://github.com/chukwudibarrah/mirrorsmind.git

navigate to the downloaded folder and install the dependencies and modules

npm install

## Requirements

You'll need to sign up for or get access keys for the following services (or you can choose to use different services and reconfigure accordingly).

### Sanity

- NEXT_PUBLIC_SANITY_PROJECT_ID=
- NEXT_PUBLIC_SANITY_DATASET=
- SANITY_API_TOKEN=
- NEXT_PUBLIC_SANITY_API_VERSION=

### Next-Auth (Authjs)

- NEXTAUTH_URL=
- NEXTAUTH_SECRET=

### Nodemailer email service

- EMAIL_SERVER=
- EMAIL_SERVER_USER=
- EMAIL_SERVER_PASSWORD=
- EMAIL_SERVER_HOST=
- EMAIL_SERVER_PORT=
- EMAIL_FROM=

### Upstash

- UPSTASH_REDIS_URL=
- UPSTASH_REDIS_TOKEN=

### MailChimp

- MAILCHIMP_API_KEY=
- MAILCHIMP_API_SERVER=
- MAILCHIMP_AUDIENCE_ID=

# Getting started

Start the development server

npm run dev

Navigate to [http://localhost:3000](http://localhost:3000) on your preferred browser to see the result.

# Screenshots

- Homepage

![Home page](/public/home-page.webp)

- Issues list

![Issues list](/public/issues-page.webp)

- Read comic

![Read comic](/public/read-comic.webp)

- Comments section

![Comments section](/public/comments.webp)

- Subscribe page

![Subscribe page](/public/subscription.webp)
