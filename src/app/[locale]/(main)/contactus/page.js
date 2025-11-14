import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  YoutubeIcon,
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  MessageCircle,
  GitCommitHorizontal,
  X,
  Navigation,
  PhoneCall,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#fffaf5] via-[#fff6ee] to-[#fffaf2] md:py-16 md:px-6">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md border border-orange-100 shadow-xl rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left side - Info */}
          <div className="p-4 md:p-10 flex flex-col justify-center bg-gradient-to-br from-[#fff0e6] via-[#fff6ee] to-[#fffaf5]">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d42f0e] via-[#f15822] to-[#f8b500]">
              Get in Touch
            </h1>
            <p className="text-slate-600 mb-8 text-base md:text-lg leading-relaxed">
              We love to hear from you! Whether you have a question about our
              services, need assistance, or just want to share feedback, feel
              free to contact us.
            </p>

            <div className="space-y-6 text-slate-700">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2"><Navigation size={20} /> Our Address</h3>
                <Link
                  href={"https://share.google/JL6elWPiku9W1Qg89"}
                  className="text-slate-600"
                >
                  Shree Niket, Mansinghka Residence, Opposite Raghuvansh Vihar
                  Colony, Bhilwara, Rajasthan - 311001
                </Link>
              </div>

              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2"><PhoneCall size={20}  /> Call Us</h3>
                <Link
                  href="tel:+917877961501"
                  target="_blank"
                  className="text-slate-600 hover:underline font-medium"
                >
                  +91 7877961501
                </Link>
              </div>

              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2 "><Mail size={20} /> Email</h3>
                <Link
                  href="mailto:customerservices.devasetu@gmail.com"
                  className="text-slate-600 hover:underline font-medium"
                >
                  customerservices.devasetu@gmail.com
                </Link>
              </div>

              <div className="flex justify-center md:justify-start gap-3 mt-4 mb-4 md:mb-0 text-white">
                <Link
                  href="https://youtube.com/@devasetu_official?si=t3cfoIWaS8pRP_B1"
                  className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]"
                >
                  <YoutubeIcon size={22} />
                </Link>
                <Link
                  href="https://www.instagram.com/devasetuofficial?igsh=MXF1OWpqcjUydWoxaA=="
                  className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]"
                >
                  <InstagramIcon size={22} />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/devasetu-techologies-private-limited/"
                  className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]"
                >
                  <LinkedinIcon size={22} />
                </Link>
                <Link
                  href=" https://whatsapp.com/channel/0029VbBO0tw6RGJK3cBMGb3y"
                  className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]"
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                </Link>
                {/* <Link
                              href="#"
                              className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]"
                            >
                              <FontAwesomeIcon icon={faXTwitter} className="text-white" />
                            </Link> */}
                <Link
                  href=" https://www.facebook.com/share/17UyCoHTUz/"
                  className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]"
                >
                  <FacebookIcon size={22} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-4 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              Send us a message
            </h2>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d42f0e] via-[#f15822] to-[#f8b500] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Send Message
              </button>
            </form>

            {/* <p className="mt-6 text-sm text-slate-500 text-center">
              By submitting this form, you agree to our{" "}
              <Link
                href="/en/privacy-policy"
                className="text-orange-600 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
