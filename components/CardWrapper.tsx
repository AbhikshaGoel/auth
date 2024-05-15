"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/components/header";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonLink: string;
  showSocials?: boolean;
};
const CardWrapper = ({
  backButtonLabel,
  backButtonLink,
  children,
  headerLabel,
  showSocials,
}: Props) => {
  return (
    <Card className=" w-full max-w-[400px] bg-[#ece3d6]">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <div className="mt-4 text-center text-lg text-[#95866f]">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline text-[#c4a97e]">
            Go Study and clear the exam to join IOCL and then book Room
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
export default CardWrapper;
