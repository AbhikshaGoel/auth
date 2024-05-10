import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] bg-[#ece3d6]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-5xl font-bold text-[#c4a97e]">Login</h1>
            <p className="text-balance text-[#95866f]">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#926e45]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-[#6c5641] text-white"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-[#926e45]">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline text-[#c4a97e]"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="bg-[#6c5641] text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#c4a97e] text-[#6c5641]"
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-[#95866f]">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline text-[#c4a97e]">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="rounded-lg hidden bg-muted lg:block">
        <Image
          src="/meeting_room.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="rounded-lg yh-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
