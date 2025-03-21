import Link from "next/link"
import Image from "next/image"
import StarLogo from "@/public/images/star.svg"

export default function Logo() {
  return (
    <Link className="inline-flex" href="/" aria-label="StarLogo">
      <Image
        className="max-w-none"
        src={StarLogo}
        width={38}
        height={38}
        priority
        alt="Logo"
      />
    </Link>
  )
}
