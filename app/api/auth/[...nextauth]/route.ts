import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

interface Environment {
    NEXT_GOOGLE_CLIENT_ID: string;
    NEXT_GOOGLE_CLIENT_SECRET: string;
    NEXT_GITHUB_CLIENT_ID: string,
    NEXT_GITHUB_CLIENT_SECRET: string
}

declare const process: {
    env: Environment;
};

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.NEXT_GITHUB_CLIENT_ID,
            clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET,
        }),       
    ]
})

export { handler as GET, handler as POST }