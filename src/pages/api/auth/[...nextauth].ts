import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import Database from '@/database/database';
import User from '@/dataAccessLayer/schemas/user';
import { paths } from "@utils/constants/paths";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(Database.setupAdapterConnection()),
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'ChatWriter',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password',
                },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                //wait database connection
                await Database.setupClient();

                //find user by email
                const user = await User.findOne({ email });

                if (user) {
                    
                    // compare password
                    const isValid = await compare(password, user.password);
                    if (!isValid) {

                        //return password error if not matched
                        throw new Error('password is incorrect');
                    }

                    if (!user.isVerified) {

                        //return email not verified error if not verified
                        throw new Error('email is not verified?' + user._id);
                    }
                } else {

                    //return email error if user not found
                    throw new Error('email does not exist');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: paths.login,
        signOut: paths.explore,
        newUser: paths.explore,
        error: paths.login
    },
    callbacks: {

        //called when user is successfully authenticated, get the user id
        //ref:https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1932922
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },

        async redirect() {
            return process.env.NEXTAUTH_URL;
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
    
};

export default NextAuth(
    authOptions,
);