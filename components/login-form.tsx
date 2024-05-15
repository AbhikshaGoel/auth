"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSearchParams } from "next/navigation";

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
import FormError from "@/components/form-error";
import { useTransition, useState, SetStateAction } from "react";
//import { login } from "@/actions/login";
import Link from "next/link";
const LoginForm = () => {
  const urlParams = useSearchParams();
  const callBackUrl = urlParams.get("callbackUrl");
  const errorUrlParam =
    urlParams.get("error") === "OAuthAccountNotLinked"
      ? "This account is already linked to a user. Please sign in with a different account."
      : ``;

  const [isPending, startTransition] = useTransition();
  const [isTwoFactor, setTwoFactor] = useState(false); // TODO: ADD 2FA
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit() {
    console.log("Submitted");
  }
  // function onSubmit(values: z.infer<typeof LoginSchema>) {
  //   setError("");
  //   setSuccess("");
  //   startTransition(() => {
  //     login(values, callBackUrl)
  //       .then(
  //         (data: {
  //           error: SetStateAction<string>;
  //           success: SetStateAction<string>;
  //           twoFactor: any;
  //         }) => {
  //           if (data?.error) {
  //             form.reset();
  //             setError(data.error);
  //           }
  //           if (data?.success) {
  //             // TODO: ADD 2FA
  //             form.reset();
  //             setSuccess(data?.success);
  //           }
  //           if (data?.twoFactor) {
  //             console.log(data.twoFactor);

  //             setTwoFactor(true);
  //           }
  //         }
  //       )
  //       .catch((err: any) => {
  //         setError("Something went wrong.");
  //       });
  //   });
  // }
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
                      placeholder="0009999"
                      {...field}
                      type="email"
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
        {isTwoFactor && (
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two Factor Code</FormLabel>
                <FormControl>
                  <Input placeholder="123456" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormError message={error || errorUrlParam} />

        <Button
          type="submit"
          className="w-full bg-[#c4a97e] text-[#6c5641] text-2xl hover:text"
          disabled={isPending}
        >
          {isTwoFactor ? "Confirm" : "Login"}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
