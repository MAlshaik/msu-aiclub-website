"use client";

import Link from "next/link";
import { createClient } from "~/utils/supabase/client";

import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"


import { useRouter } from "next/navigation";
import { useState } from "react";
import { register, loginWithGoogle } from "~/server/actions/auth";
import { toast } from "react-hot-toast";
import { Spacer } from "@nextui-org/react";
import Image from "next/image";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Label } from "@radix-ui/react-label";

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();
    
    const handleSubmit = async () => {
        const res = await register(email, password);
        setMessage(res || ''); 
        if (res) {
            toast.error(res, {
            duration: 4000, 
            position: 'bottom-right', 
            style: {
                border: '2px solid #333',
                color: '#fff',
                backgroundColor: '#333',
            },
            });
        } else {
            console.log("registered successfully")
            toast.success('Registered successfully', {
            duration: 4000, 
            position: 'bottom-right', 
            style: {
                border: '2px solid #333',
                color: '#fff',
                backgroundColor: '#333',
            }, 
            });

            router.push('/auth/confirm');
        }

    }

    return (
        <Card className="flex flex-col bg-background mx-auto min-w-[400px] min-h-[450px] max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl text-center">Register</CardTitle>
            <CardDescription className="text-m flex flex-col gap-4">
            <Spacer/>
            <Button 
            variant="secondary" 
            className="w-full gap-3"
            onClick={() => loginWithGoogle()}
            >
                <Image
                src={'/google.svg'}
                alt="Google"
                width={20}
                height={20}
                >
                </Image>
                Register with Google
            </Button>
            </CardDescription>
        </CardHeader>
        <div className="flex flex-row justify-center text-center items-center gap-4">
            <Separator className="w-2/5" />
            <p className="w-1/5">Or</p>
            <Separator className="w-2/5" />
        </div>
        <CardContent>
            <div className="grid gap-4">
                <Label>{message}</Label>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-start">
                <Label htmlFor="password">Password</Label>
                </div>
                <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
                Register
            </Button>
            </div>
            <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
                Login
            </Link>
            </div>
        </CardContent>
        </Card>
    )
}
