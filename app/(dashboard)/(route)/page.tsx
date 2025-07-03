import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-sky-700">
      hello
      <Button>submit</Button>
      <UserButton />
    </div>
  );
}
