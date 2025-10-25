"use client";

import Image from "next/image";
import { Youtube, Instagram, Linkedin, Facebook, MessageCircle, X, YoutubeIcon, InstagramIcon, LinkedinIcon, FacebookIcon, TwitterIcon, GitCommitHorizontal } from "lucide-react";
import Link from "next/link";
import FooterLogo from '../../../public/icons/devsetu-logo-icon.svg';
import DigitalIndia from '../../../public/icons/digital-india.svg';
import ISO from '../../../public/icons/iso.svg';
import Razorpay from '../../../public/icons/razorpay.svg';
import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary-light)] text-white mt-12">
      <Container>
        <div className="mx-auto md:px-6 py-4 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Left - Logo & About */}
          <div className=" col-span-2">
            <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
              <Image src={FooterLogo} alt="Dev Setu" width={100} height={100} className="" />
              <span className="font-secondary text-2xl font-semibold">Dev Setu</span>
            </div>
            <p className="text-sm leading-relaxed">
              Dev Setu has brought religious services to the masses in India by connecting devotees,
              pandits and temples. Partnering with over 50 renowned temples, we provide exclusive pujas
              and offerings performed by expert pandits and share videos of the completed puja rituals.
            </p>
            <div className="flex justify-center md:justify-start gap-3 mt-4 mb-4 md:mb-0">
              <Link href="#" className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]" ><YoutubeIcon size={22} /></Link>
              <Link href="#" className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]" ><InstagramIcon size={22} /></Link>
              <Link href="#" className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]" ><LinkedinIcon size={22} /></Link>
              <Link href="#" className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]" ><MessageCircle size={22} /></Link>
              <Link href="#" className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]" ><TwitterIcon size={22} /></Link>
              <Link href="#" className="bg-[#f15822] w-[35px] h-[35px] flex justify-center items-center rounded-[4px]" ><FacebookIcon size={22} /></Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-secondary font-bold text-lg md:text-xl mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about-us" className="text-base md:text-lg hover:underline">About Us</Link></li>
              <li><Link href="/contect-us" className="text-base md:text-lg hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-secondary font-bold text-lg md:text-xl mb-3">Our Services</h3>
            <ul className="space-y-2">
              <li><Link href="/puja" className="text-base md:text-lg hover:underline">Puja</Link></li>
              <li><Link href="/chadhava" className="text-base md:text-lg hover:underline">Chadhava</Link></li>
              <li><Link href="/vip-puja" className="text-base md:text-lg hover:underline">VIP Puja</Link></li>
              <li><Link href="/seva" className="text-base md:text-lg hover:underline">Seva</Link></li>
            </ul>
          </div>

          {/* Address & Socials */}
          <div>
            <h3 className="font-secondary font-bold text-lg md:text-xl mb-3">Our Address</h3>
            <p className="text-sm mb-4">
              {/* Firstprinciple AppsForBharat Pvt. Ltd. 435, 1st Floor 17th Cross, 19th Main Rd,
              above Axis Bank, Sector 4, HSR Layout, Bengaluru, Karnataka 560102 */}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-400 mt-6">
          <div className="mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

            {/* App Store Badges */}
            {/* <div className="flex gap-4">
            <Image src="/google-play-badge.png" alt="Google Play" width={150} height={45} />
            <Image src="/app-store-badge.png" alt="App Store" width={150} height={45} />
          </div> */}

            {/* Certifications */}
            <div className="flex gap-6 items-center">
              <Link href={'#'}>
                <Image src={DigitalIndia} alt="Digital India" width={60} height={40} />
              </Link>
              <Link href={'#'}>
                <Image src={ISO} alt="ISO" width={60} height={40} />
              </Link>
              <Link href={"#"} >
                <Image src={Razorpay} alt="Razorpay" width={60} height={40} />
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-center md:text-right">
              <div className="flex ">
                <Link href="#" className="hover:underline">Privacy Policy</Link>{' '}  {' '} <GitCommitHorizontal />
              <Link href="#" className="hover:underline">Terms and Conditions</Link>
              </div>
              <p className="mt-1">© 2025 <span className="font-secondary">DevSetu</span>, Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
