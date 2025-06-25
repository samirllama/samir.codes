import { Timestamp } from "@/components/Timestamp";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="py-20 px-6 border-t border-current">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Let's build something{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              extraordinary
            </span>
          </h2>

          <div className="flex justify-center gap-6 mb-8">
            <a
              href="github"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="linkedin/in/samirllama"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="samirllama@gmail.com"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>

          <p className="text-gray-500">
            &copy; <Timestamp /> Samir.codes • Crafted with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
