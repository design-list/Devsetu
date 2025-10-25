"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  YoutubeIcon,
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  MessageCircle,
  GitCommitHorizontal,
} from "lucide-react";
import FooterLogo from "../../../public/icons/devsetu-logo-icon.svg";
import DigitalIndia from "../../../public/icons/digital-india.svg";
import ISO from "../../../public/icons/iso.svg";
import Razorpay from "../../../public/icons/razorpay.svg";
import Container from "@/components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  // ✅ State for modal open/close
  const [modal, setModal] = useState(null); // "privacy" | "terms" | null

  // ✅ Reusable modal component
  const Modal = ({ title, children }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
        <button
          onClick={() => setModal(null)}
          className="absolute top-3 right-4 text-text-[var(--color-dark)] text-2xl cursor-pointer"
        >
          ×
        </button>
        <h2 className="text-3xl font-bold mb-4 font-secondary">{title}</h2>
        <div className="text-[var(--color-dark)] text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );

  return (
    <footer className="bg-[var(--color-accent)] text-[var(--color-dark)] mt-12">
      <Container>
        <div className="mx-auto md:px-6 py-4 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Left - Logo & About */}
          <div className="col-span-2">
            <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
              <Image src={FooterLogo} alt="DevaSetu" width={100} height={100} />
              <span className="font-secondary text-2xl font-semibold">
                DevaSetu
              </span>
            </div>
            <p className="text-base leading-relaxed pr-8">
              DevaSetu has brought religious services to the masses in India by
              connecting devotees, pandits and temples. Partnering with over 50
              renowned temples, we provide exclusive pujas and offerings
              performed by expert pandits and share videos of the completed puja
              rituals.
            </p>
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

          {/* Company Links */}
          <div>
            <h3 className="font-secondary font-bold text-lg md:text-xl mb-3">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="text-sm md:text-base hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-sm md:text-base hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-secondary font-bold text-lg md:text-xl mb-3">
              Our Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/puja"
                  className="text-sm md:text-base hover:underline"
                >
                  Puja
                </Link>
              </li>
              <li>
                <Link
                  href="/chadhava"
                  className="text-sm md:text-base hover:underline"
                >
                  Chadhava
                </Link>
              </li>
              <li>
                <Link
                  href="/vip-puja"
                  className="text-sm md:text-base hover:underline"
                >
                  VIP Puja
                </Link>
              </li>
              <li>
                <Link
                  href="/seva"
                  className="text-sm md:text-base hover:underline"
                >
                  Seva
                </Link>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-secondary font-bold text-lg md:text-xl mb-3">
              Our Address
            </h3>
            <Link
              href="https://share.google/X0NN6PvedfpX3MeKa"
              className="text-base mb-4 block"
            >
              Shree Niket, Mansinghka Residence, Opposite Raghuvansh Vihar
              Colony, Bhilwara, Rajasthan - 311001
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-400 mt-6">
          <div className="mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Certifications */}
            <div className="flex gap-6 items-center">
              <Link href="#">
                <Image src={DigitalIndia} alt="Digital India" width={60} height={40} />
              </Link>
              <Link href="#">
                <Image src={ISO} alt="ISO" width={60} height={40} />
              </Link>
              <Link href="#">
                <Image src={Razorpay} alt="Razorpay" width={60} height={40} />
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-center md:text-right">
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <button
                  onClick={() => setModal("privacy")}
                  className="hover:underline cursor-pointer"
                >
                  Privacy Policy
                </button>
                <GitCommitHorizontal />
                <button
                  onClick={() => setModal("terms")}
                  className="hover:underline cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </div>
              <p className="mt-1">
                © 2025 <span className="font-secondary">DevaSetu</span>, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* ✅ Privacy Policy Modal */}
      {modal === "privacy" && (
        <Modal className={'font-secondary'} title="Privacy Policy">
          <p className="text-base font-primary">
            We value your privacy. Your data is handled securely and used only for service-related
            purposes. We do not share your information with third parties without consent.
          </p>
        </Modal>
      )}

      {/* ✅ Terms & Conditions Modal */}
      {modal === "terms" && (
        <Modal title="Terms & Conditions">
          <p>
            By using DevaSetu services, you agree to comply with all applicable rules and guidelines.
            Our services are subject to updates, and usage implies acceptance of the latest terms.
          </p>
        </Modal>
      )}
    </footer>
  );
}
