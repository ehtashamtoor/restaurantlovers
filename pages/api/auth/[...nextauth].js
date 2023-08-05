import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { Customer } from "@/models/Customer";
import { Restaurant } from "@/models/Restaurant";
import { mongooseConnect } from "@/lib/mongoose";

// const adminEmails = ["ehtashamtoor50@gmail.com"];

export const AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "restaurant",
      name: "credentials",
      credentials: {
        // username: { label: "Username", type: "text" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add your custom authentication logic here
        // console.log(credentials);
        // console.log("body", req.body?.type);

        await mongooseConnect();
        const { username, password } = credentials;
        console.log("restaurant login info", username, password);
        // console.log("hey................hey...............hey");
        const user = await getUserByName(username);
        // const user = await Restaurant.findOne({ name: username });

        // console.log("user found", user);
        if (!user) {
          throw new Error("Email or Password incorrect");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        // console.log(passwordsMatch);

        if (!passwordsMatch) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
    CredentialsProvider({
      id: "customer",
      name: "customer-credentials",
      credentials: {
        // email: { label: "Email", type: "email" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await mongooseConnect();
        const { email, password } = credentials;
        console.log("Customer login form Info:", email, password);

        const user = await getUserByEmail(email);

        if (!user) {
          throw new Error("Email or Password Invalid");
        }

        // Example: Compare password hashes
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          throw new Error("Invalid password");
        }
        // console.log("Customer--->>>", user);

        return user;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    jwt: ({ token, user, account }) => {
      if (user) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.role = user.role;
        // console.log("user.....", user);
        token.name = user?.name;
        // console.log("tokenjwt", token);
        // console.log("userjwt", user);
      }
      return token;
    },
    session: ({ token, session }) => {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      // console.log("sessionjwt", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

// export default NextAuth(AuthOptions);
export default (req, res) => NextAuth(req, res, AuthOptions);

async function getUserByName(name) {
  // console.log(name);
  const user = await Restaurant.findOne({ name });
  if (!user) return null;

  return user;
}
async function getUserByEmail(email) {
  // console.log(name);
  const user = await Customer.findOne({ email });
  if (!user) return null;

  return user;
}
