'use client'

import {Icons} from '@/components/ui/Icons'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import { Eye, EyeOff, Loader2} from 'lucide-react'
import Link from 'next/link'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {Checkbox} from "@/components/ui/checkbox";
import React, {useState, useEffect} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSignIn from "@/hooks/useSignIn";
import Cookies from 'js-cookie';
import useVerification from "@/hooks/useVerification";

const Page = () => {
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false); // State to control the "Verify You!" dialog open state
  const [openForgotDialog, setOpenForgotDialog] = useState(false); // State to control the "Forgot Password!" dialog open state
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const [showRePassword, setShowRePassword] = useState(false); // State to control retype password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const { signIn, isLoading: isSignInLoading } = useSignIn();
  const { verification, isLoading: isVerificationLoading } = useVerification();

  useEffect(() => {
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);


  return (
      <>
        <MaxWidthWrapper>
          <div className='container relative flex pt-10 flex-col items-center justify-center lg:px-0 -mt-5 mb-5'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]'>
              <div className='flex flex-col items-center space-y-2 text-center '>
                <Icons.logo className='h-50 w-50'/>
                <h1 className='text-2xl font-semibold tracking-tight'>
                  Sign in to your Admin Account
                </h1>
              </div>

              <div className='grid gap-6 mx-10'>
                <div >
                  <div className='grid gap-2'>
                    <div className='grid gap-1 py-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                          type='email'
                          name='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='you@example.com'
                          autoComplete='email'
                      />
                    </div>

                    <div className='grid gap-1 py-2'>
                      <div className="flex items-center justify-between">
                        <Label htmlFor='password'>Password</Label>
                        <div className="text-sm ">
                          <div
                              onClick={() => setOpenVerifyDialog(true)}
                              className="font-semibold cursor-pointer text-[#3a72ec] hover:text-indigo-500"
                          >
                            Forgot password?
                          </div>
                        </div>
                      </div>
                      <div className='relative'>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            autoComplete='current-password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye/> : <EyeOff/>}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-center space-x-2">

                        <Checkbox id="terms" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked === true)}/>
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember Me
                        </label>
                      </div>

                    </div>

                    <Button
                        className='mt-5 w-full'
                        type='button'
                        disabled={isSignInLoading}
                        onClick={() => signIn(email, password, rememberMe, setOpenVerifyDialog)}
                    >
                      {isSignInLoading && (<Loader2 className='mr-2 h-4 w-4 animate-spin'/>)}
                      Sign in
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        <Dialog open={openVerifyDialog} onOpenChange={setOpenVerifyDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className='text-center text-2xl'>Verify You!</DialogTitle>
              <DialogDescription className='text-black'>
                Enter your Verification Code that was sent to reset your email.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                  id="verification-code"
                  type="text"
                  placeholder="Enter your code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button className='w-full'
                      onClick={() => verification(email,verificationCode, setOpenVerifyDialog)}>
                Submit
                {isVerificationLoading && (<Loader2 className='mr-2 h-4 w-4 animate-spin'/>)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openForgotDialog} onOpenChange={setOpenForgotDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className='text-center text-2xl'>Forgot Password!</DialogTitle>
              <DialogDescription className='text-center'>
                Remember your password? <Link href="/sign-in" className="text-[#3a72ec] font-bold ">Sign In
                here</Link>
              </DialogDescription>
            </DialogHeader>
            <div className="xl:grid-cols-2 flex gap-4 py-4">
              <div className='space-y-1 relative'>
                <Label htmlFor="new-password" className="text-right">
                  New Password
                </Label>
                <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="ex:- **"
                    className="col-span-3"
                />
                <div
                    className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye/> : <EyeOff/>}
                </div>
              </div>
              <div className='space-y-1 relative'>
                <Label htmlFor="retype-password" className="text-right">
                  Re-type Password
                </Label>
                <Input
                    id="retype-password"
                    type={showRePassword ? "text" : "password"}
                    placeholder="ex:- **"
                    className="col-span-3"
                />
                <div
                    className="absolute inset-y-0 right-0 pr-3 flex pt-5 items-center cursor-pointer"
                    onClick={() => setShowRePassword(!showRePassword)}
                >
                  {showRePassword ? <Eye/> : <EyeOff/>}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className='w-full' onClick={() => setOpenForgotDialog(false)}>Reset Password</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
  )
}

export default Page;
