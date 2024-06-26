"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import axios from 'axios';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";

import { useTransition, useState } from "react";

import Link from "next/link";
import FormError from "./form-error";
import { signIn } from "@/auth";
import { signInWithCredentials } from "@/sign";
const LoginForm = () => {


  const [isPending, startTransition] = useTransition();
  const [isTwoFactor, setTwoFactor] = useState(false); // TODO: ADD 2FA
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // function onSubmit() {
  //   console.log("login");
  // }
  // function onSubmit(values: z.infer<typeof LoginSchema>) {
  //   setError("");
  //   //setSuccess("");
  //   startTransition(() => {
  //     login(values, callBackUrl)
  //       .then((data) => {
  //         if (data?.error) {
  //           form.reset();
  //           setError(data.error);
  //         }
  //         // if (data?.success) {
  //         //   // TODO: ADD 2FA
  //         //   form.reset();
  //         //   setSuccess(data?.success);
  //         // }
  //       })
  //       .catch((err) => {
  //         setError("Something went wrong.");
  //       });
  //   });
  // }
  

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
     const response = await signInWithCredentials(values);
     console.log("user response", response);
      // Handle success (optional)
    } catch (error:any) {
      setError(error.message);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {!isTwoFactor && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0051xxx"
                      {...field}
                      type="number"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      {...field}
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <Button
                    size={"sm"}
                    variant={"link"}
                    asChild
                    className="font-normal px-0"
                  >
                    <Link href="/auth/reset">Forgot Password?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        
        <FormError message={error} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isTwoFactor ? "Confirm" : "Login"}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
