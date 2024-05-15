import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
};
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const Header = (props: Props) => {
  return (
    <div className={cn("w-full space-y-4", font.className)}>
      <h1 className="text-4xl font-semibold drop-shadow-lg text-primary text-center text-[#c4a97e]">
        Conference Hall Booking
        <div className="flex justify-center items-center w-full">
          <Image
            src="/iocl_logo.png"
            alt="Image"
            width="220"
            height="120"
            className="rounded-lg object-cover dark:brightness-[0.2]"
          />
        </div>
      </h1>
      <p className="text-[#95866f] text-sm text-muted text-center capitalize">
        {props.label}
      </p>
    </div>
  );
};
export default Header;
