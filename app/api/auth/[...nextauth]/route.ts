import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      return profile.email.endsWith("@scarletmail.rutgers.edu")
    }
  }
})

export { handler as GET, handler as POST }