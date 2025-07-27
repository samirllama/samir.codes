import Image from "next/image";
import { cn } from "@/lib/utils";

type GifProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

export const Gif = ({
  src,
  alt = "",
  className = "",
  width = 800,
  height = 450,
}: GifProps) => {
  return (
    <div className="my-6 flex justify-center">
      <Image
        src={src}
        alt={alt}
        className={cn("rounded-md border border-border shadow-sm", className)}
        width={width}
        height={height}
        unoptimized
      />
    </div>
  );
};
