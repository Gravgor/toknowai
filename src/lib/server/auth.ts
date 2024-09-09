import { authenticateUser } from "@/actions/userActions";
import {
    getServerSession,
    type NextAuthOptions,
  } from "next-auth";
  import Credentials from "next-auth/providers/credentials";
  
  export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt", //(1)
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && account.type === "credentials") {
              token.userId = account.providerAccountId!;
              if(user) {
                //@ts-expect-error
                token.role = user.role;
              }
            }
            return token;
          },
          async session({ session, token }) {
            session.user.id = token.userId;
            session.user.role = token.role as string;
            return session;
          },
          async signIn({account, user}) {
            if (account && account.type === "credentials") {
              return true;
            }
            return false;
          },
    },
    pages: {
      signIn: '/login', //(4) custom signin page path
    },
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "email@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials) {
            return null;
          }
          const { email, password } = credentials;
  
          const user = await authenticateUser(email, password);
          if (!user) {
            return null;
          }
          return user;
        }
      })
    ],
  };
  
  export const getServerAuthSession = () => getServerSession(authOptions); 