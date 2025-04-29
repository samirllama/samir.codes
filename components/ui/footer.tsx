import { Timestamp } from "@/components/Timestamp";

export default function Footer() {
  return (
    <footer>
      <div className="px-4 lg:px-5">
        <div className="grid grid-cols-2 text-lg leading-none lg:text-xl lg:leading-none border-t border-current pt-4 pb-3 lg:pt-4 lg:pb-3 items-center">
          <div className="col-span-1">
            <nav className="ml-auto flex space-x-3 lg:space-x-4">
              <a
                href="https://www.linkedin.com/in/samirllama/"
                target="_blank"
                rel="noopener noreferrer"
                className="block group a11y-focus"
              >
                <span className="block relative overflow-hidden">
                  LinkedIn{" "}
                  <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                    <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                  </span>
                </span>
              </a>
              <a
                href="https://github.com/samirllama"
                target="_blank"
                rel="noopener noreferrer"
                className="block group a11y-focus"
              >
                <span className="block relative overflow-hidden">
                  Github{" "}
                  <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                    <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                  </span>
                </span>
              </a>
              <a href="samirllama@gmail.com" className="block group a11y-focus">
                <span className="block relative overflow-hidden">
                  Email{" "}
                  <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                    <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                  </span>
                </span>
              </a>
            </nav>
          </div>

          <div className="col-span-1 text-right flex justify-end">
            <button className="block group a11y-focus border-none outline-none focus:border-none focus:outline-none">
              <span className="block relative overflow-hidden">
                <span className="hidden lg:inline">Back To </span>Top
                <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                  <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <span className="hidden lg:inline">
          &copy; <Timestamp /> Samir.Coder. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
