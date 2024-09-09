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
      async jwt({ token, account, profile }) { 
        if(account && account.type === "credentials") { //(2)
          token.userId = account.providerAccountId; // this is Id that coming from authorize() callback 
        }
        return token;
      },
      async session({ session, token, user }) { 
        session.user.id = token.userId; //(3)
        return session;
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
        async authorize(credentials, req) {
          if (!credentials) {
            return null;
          }
          const { email, password } = credentials;
  
          return { id: "1", name: "John Doe", email: "john.doe@example.com" };
        }
      })
    ],
  };
  
  export const getServerAuthSession = () => getServerSession(authOptions); 