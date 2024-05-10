import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 bg-[#ece3d6]">
      <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full sm:max-w-md lg:max-w-lg gap-6">
          <div className="flex justify-center items-center w-full">
            <Image
              src="/iocl_logo.png"
              alt="Image"
              width="220"
              height="120"
              className="rounded-lg object-cover dark:brightness-[0.2]"
            />
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-[#c4a97e]">
              Conference Hall Booking
            </h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-xl sm:text-2xl text-[#926e45]"
              >
                Login Id
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
                <Label
                  htmlFor="password"
                  className="text-xl sm:text-2xl text-[#926e45]"
                >
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
              size="lg"
              type="submit"
              className="w-full bg-[#c4a97e] text-[#6c5641] text-2xl hover:text"
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-lg text-[#95866f]">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline text-[#c4a97e]">
              Go Study and clear the exam to join IOCL and then book Room
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
          className="rounded-lg h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>
    </div>
  );
}
