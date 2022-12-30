import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import axios from 'axios'

import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import url from 'services/endpoint.action'

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/signin'
    },
    session: {
        strategy: 'jwt',
        maxAge: 300000
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { emailId, password, OTP, userId } = credentials as { emailId: string, password: string, OTP: string, userId: string }
                if (OTP) {
                    try {
                        const user = await axios.post(`${url}}/trade-App/common/verifySecurityCode/${userId}`, {
                            OTP: parseInt(OTP)
                        })
                        return user.data.responseData.User
                    } catch (error: any) {
                        throw new Error(error.message)
                    }
                } else {
                    try {
                        const user: any = await axios.post(`${url}/trade-App/admin/login`, {
                            emailId,
                            password
                        })
                        if(user.data.responseCode===200){
                            return user.data.responseData
                        }else{
                            throw new Error(user.data.responseMessage)
                        }
                    } catch (error: any) {
                        throw new Error(error.message)
                    }
                }
            }
        }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID!,
        //     clientSecret: process.env.GITHUB_CLIENT_Secrets!
        // })
    ],
    callbacks: {
        async signIn({ user }) {
            // console.log('Seconf', user)
            if (user) {
            //    console.log('True')
                return true
            } else {
            //    console.log('error')
                return false
            }
        },
        async redirect({ baseUrl }) {
        //    console.log('baseUrl', baseUrl)
            return baseUrl
        },
        async jwt({ token, user }) {
           // console.log('User', user, 'TOken', token)
            if (user) {
                return {
                    ...token,
                    user
                }
            }
            return token
        },
        async session({ session, token }) {
           // console.log('sessionToken', token, 'session', session)
            if (token) {
                return {
                    ...session, user: token.user as Session['user']
                }
            }
            return session
        },
    }
}
export default NextAuth(authOptions)