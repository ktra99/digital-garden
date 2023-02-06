/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'sv'],
    defaultLocale: 'en',
  },
}

const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()(nextConfig)
