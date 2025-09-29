"use client";

import Image from "next/image";
import { Youtube, Instagram, Linkedin, Facebook, MessageCircle, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left - Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/logo.png" alt="Dev Setu" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-semibold">Dev Setu</span>
          </div>
          <p className="text-sm leading-relaxed">
            Dev Setu has brought religious services to the masses in India by connecting devotees,
            pandits and temples. Partnering with over 50 renowned temples, we provide exclusive pujas
            and offerings performed by expert pandits and share videos of the completed puja rituals.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about-us" className="hover:underline">About Us</Link></li>
            <li><Link href="/contect-us" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Our Services</h3>
          <ul className="space-y-2">
            <li><Link href="/puja" className="hover:underline">Puja</Link></li>
            <li><Link href="/chadhava" className="hover:underline">Chadhava</Link></li>
            <li><Link href="/vip-puja" className="hover:underline">VIP Puja</Link></li>
            <li><Link href="/seva" className="hover:underline">Seva</Link></li>
          </ul>
        </div>

        {/* Address & Socials */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Our Address</h3>
          <p className="text-sm mb-4">
            Firstprinciple AppsForBharat Pvt. Ltd. 435, 1st Floor 17th Cross, 19th Main Rd,
            above Axis Bank, Sector 4, HSR Layout, Bengaluru, Karnataka 560102
          </p>
          <div className="flex gap-3">
            <Link href="#"><Youtube size={22} /></Link>
            <Link href="#"><Instagram size={22} /></Link>
            <Link href="#"><Linkedin size={22} /></Link>
            <Link href="#"><MessageCircle size={22} /></Link>
            <Link href="#"><X size={22} /></Link>
            <Link href="#"><Facebook size={22} /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-400 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* App Store Badges */}
          <div className="flex gap-4">
            <Image src="/google-play-badge.png" alt="Google Play" width={150} height={45} />
            <Image src="/app-store-badge.png" alt="App Store" width={150} height={45} />
          </div>

          {/* Certifications */}
          <div className="flex gap-6 items-center">
            <Image src="/digital-india.png" alt="Digital India" width={80} height={40} />
            <Image src="/iso.png" alt="ISO" width={60} height={40} />
            <Image src="/razorpay.png" alt="Razorpay" width={100} height={40} />
          </div>

          {/* Copyright */}
          <div className="text-sm text-center md:text-right">
            <Link href="#" className="hover:underline">Privacy Policy</Link> ·{" "}
            <Link href="#" className="hover:underline">Terms and Conditions</Link>
            <p className="mt-1">© 2025 SriMandir, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
