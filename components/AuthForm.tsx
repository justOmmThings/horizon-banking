'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import { getLoggedInUser, signIn } from '@/lib/actions/users.actions'
import { signUp } from '@/lib/actions/users.actions'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { useRouter } from 'next/navigation'

const AuthForm = ({ type }: { type:string }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })
    
    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        setIsLoading(true)
        try {
            // Sign Up with Appwrite and create plain token

            if(type === 'sign-up'){
                const newUser = await signUp(data);
                setUser(newUser);
            } 

            if(type === 'sign-in'){
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                });

                if(response) router.push('/')
            }
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

  return (
    <section className="auth-form mt-[-35px]">
        <header className="flex flex-col gap-5 md:gap-8">
            <Link href = '/' className = 'curson-pointer flex items-center gap-1'>
                  <Image 
                  src = '/icons/logo.svg'
                  width = {34}
                  height = {34} 
                  alt = 'Horizon Logo' />
                  <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>
            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className='text-24 lg:text-36'>{user
                    ? 'Link Account'
                    : type === 'sign-in'
                        ? 'Sign In'
                        : 'Sign Up'}
                </h1>
                <p className="text-16 font-normal text-gray-600">
                    {user
                    ? 'Link your account to get started'
                    : 'Please enter your details'}
                </p>
            </div>
        </header>
        {user ? (
            <div className="flex flex-col gap-4">
                {/* {Plain Link} */}
            </div>
        )
        : (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        {type === 'sign-up' && (
                            <>
                                <div className='flex gap-4'>
                                    <CustomInput control = {form.control} label = 'First Name' name = "firstName" placeholder='ex: John'
                                    />
                                    <CustomInput control = {form.control} label = 'Last Name' name = "lastName" placeholder='ex: Doe'
                                    />
                                </div>
                                <CustomInput control = {form.control} label = 'Address' name = "address1" placeholder='Enter your specific address'
                                /><CustomInput control = {form.control} label = 'City' name = "city" placeholder='Enter your city'
                                />
                                <div className="flex gap-4">
                                    <CustomInput control = {form.control} label = 'State' name = "state" placeholder='ex: Maharashtra'
                                    />
                                    <CustomInput control = {form.control} label = 'Postal Code' name = "postalCode" placeholder='ex: 400053'
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <CustomInput control = {form.control} label = 'Date of Birth' name = "dateOfBirth" placeholder='DD-MM-YYYY'
                                    />
                                    <CustomInput control = {form.control} label = 'SSN' name = "ssn" placeholder='ex: 1234'
                                    />
                                </div>
                            </>
                        )}
                        <CustomInput control = {form.control} label = 'Email' name = "email" placeholder='Enter your email'
                        />
                        <CustomInput control = {form.control} label = "Password" name = "password" placeholder = "Enter your password"
                        />
                        <div className='flex flex-col gap-4'>
                            <Button type="submit" className='form-btn' disabled = {isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className='animate-spin'/> &nbsp;
                                        Loading...
                                    </>
                                ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>
                </Form>

                <footer className='flex justify-center gap-1 font-semibold'>
                            <p className='text-14 font-normal text-gray-600'>{type === 'sign-in'
                                ? "Don't have an account?"
                                : "Already have an account?"}
                            </p>
                            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                                {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                            </Link>
                            
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm