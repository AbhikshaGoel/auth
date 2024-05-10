import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 bg-[#ece3d6]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-5xl font-bold text-[#c4a97e]">Login</h1>
            <p className="text-2xl text-[#95866f]">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-2xl text-[#926e45]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="text-lg p-3"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-2xl text-[#926e45]">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-lg underline text-[#c4a97e]"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="text-lg p-3"
              />
            </div>
            <Button
              type="submit"
              className="h-12 w-full bg-[#c4a97e] text-[#6c5641] text-2xl p-3"
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-lg text-[#95866f]">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline text-[#c4a97e]">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="rounded-lg hidden lg:block">
        <Image
          src="/meeting_room.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="rounded-lg h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
