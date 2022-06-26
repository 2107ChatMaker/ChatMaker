import NextAuth from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import Database from '@/Database/database';
import User from '@/dataAccessLayer/schemas/user';
import { paths } from "@constants/paths";

export default NextAuth(
    {
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
                    } else {
                        //return email error if user not found
                        throw new Error('email does not exist');
                    }

                    return {
                        id: user._id,
                        email: user.email
                    };
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
            async redirect() {
                return process.env.NEXTAUTH_URL;
            }
        }
    }
);