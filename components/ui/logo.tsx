import Link from "next/link"
import Image from "next/image"
import LogoImg from "@/public/logo.svg"

export default function Logo() {
  return (
    <Link className="inline-flex" href="/" aria-label="ai.com">
      <Image
        className="max-w-none"
        src={LogoImg}
        width={38}
        height={38}
        priority
        alt="logo"
      />
    </Link>
  )
}
