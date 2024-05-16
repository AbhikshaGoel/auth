import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
