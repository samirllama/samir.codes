import Link from "next/link"
import Logo from "./logo"
import MobileMenu from "./mobile-menu"

export default async function Header() {
  //  const data = await getContentForHeaderNav()
  //  const links = data.navigationCollection.items[0].linksCollection.items
  const links = [
    { link: "/services", label: "Discover Our Services" },
    { link: "/contact", label: "Contact Us" },
    { label: "About Us", link: "/about-us" },
  ]
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-1">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow justify-center flex-wrap items-center">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out"
                    href={link.link}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
