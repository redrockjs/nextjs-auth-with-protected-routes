import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("No credentials.");
                }
                const { email, password } = credentials;
                return null //userService.signInCredentials(email, password);
            },
        }),
    ],

    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log(token)
            /* Step 1: update the token based on the user object */
            if (user) {
                //token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            /* Step 2: update the session.user based on the token object */
            if (token && session.user) {
                //session.user.role = token.role;
            }
            return session;
        },
    },
});
