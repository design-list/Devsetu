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
  X,
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
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={() => setModal(null)}
          className="absolute top-3 right-4 text-[var(--color-dark)] text-2xl cursor-pointer"
        >
          <X />
        </button>
        <h2 className="text-3xl font-bold mb-4 font-secondary">{title}</h2>
        <div className="text-[var(--color-dark)] text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <footer className="bg-[#255667] text-[var(--color-white)]">
      <Container>
        <div className="mx-auto md:px-6 py-4 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Left - Logo & About */}
          <div className="col-span-2">
            <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
              <Image src={FooterLogo} alt="DevaSetu" width={100} height={100} className=" w-[80px] h-[80px] md:w-[100px] md:h-[100px]" />
              <span className="font-secondary text-2xl font-semibold">
                DevaSetu
              </span>
            </div>
            <p className="text-sm md:text-base font-medium leading-relaxed md:pr-8 text-center md:text-left">
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
              {/* <li>
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
              </li> */}
            </ul>
          </div>

          {/* Address */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-secondary font-bold text-lg md:text-xl mb-3 text-center md:text-left">
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
                <Image
                  src={DigitalIndia}
                  alt="Digital India"
                  width={60}
                  height={40}
                />
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
                © 2025 <span className="font-secondary">DevaSetu</span>, Inc.
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* ✅ Privacy Policy Modal */}
      {modal === "privacy" && (
        <Modal className="font-secondary" title="Privacy Policy">
          <div className="max-h-[75vh] overflow-y-auto text-gray-700 space-y-4 pr-2">
            <h3 className="text-lg font-bold text-gray-900">PRIVACY POLICY</h3>
            <p className="text-sm text-gray-500">
              Last Updated: 25th October 2025
            </p>

            <p>
              The website <strong>https://www.devasetu.com/</strong> and
              associated mobile applications (“Platform”) are operated by{" "}
              <strong>DevaSetu Technologies Private Limited</strong>, a private
              company incorporated under the Companies Act, 2013 and having its
              registered office at Shree Niket, Mansinghka Residence, Opposite
              Raghuvansh Vihar Colony, Bhilwara, Rajasthan – 311001 (“Company”,
              “we”, “us”, or “our”).
            </p>

            <p>
              The Platform provides spiritual content, digital puja services,
              astrology consultations, and devotional products (“Services”).
              This Privacy Policy (“Policy”) explains how we collect, use, and
              protect your data when you use our Platform or Services.
            </p>

            <p className="text-sm text-gray-500">
              This Policy complies with the Information Technology Act, 2000 and
              the Information Technology (Intermediary Guidelines and Digital
              Media Ethics Code) Rules, 2021.
            </p>

            {/* 1. COLLECTION OF INFORMATION */}
            <h4 className="font-semibold text-gray-900">
              1. COLLECTION OF INFORMATION
            </h4>

            <p className="font-medium">1.1 Information You Provide</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Personal details such as full name, contact number, gender,
                photograph, date/time/place of birth (for astrology services).
              </li>
              <li>
                Email address and phone number for account and communication.
              </li>
              <li>Other personal details shared while availing Services.</li>
            </ul>

            <p className="font-medium">
              1.2 Automatically Collected Information
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Device, browser, and system details (e.g., operating system, IP
                address, logs).
              </li>
              <li>Cookies and analytics to improve user experience.</li>
              <li>Location and behavior data via permitted technologies.</li>
            </ul>

            <p className="font-medium">1.3 Contacts List (if applicable)</p>
            <p>
              If our mobile app requests access to your contacts (for
              referrals), we will seek explicit consent. You may deny or revoke
              this anytime.
            </p>

            <p className="font-medium">1.4 Payment Information</p>
            <p>
              Payment data (e.g., UPI or card details) is handled by secure
              third-party payment gateways. DevaSetu does not store your banking
              information.
            </p>

            {/* 2. USE OF INFORMATION */}
            <h4 className="font-semibold text-gray-900">
              2. USE OF INFORMATION
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and manage access to our Services.</li>
              <li>To improve functionality, experience, and quality.</li>
              <li>To verify identity and eligibility.</li>
              <li>To send service updates, offers, or notifications.</li>
              <li>To comply with legal obligations and prevent fraud.</li>
              <li>To respond to support requests and feedback.</li>
              <li>To enforce our Terms of Use.</li>
            </ul>

            <p className="font-medium">2.1 Communications</p>
            <p>
              By using our Services, you consent to receive updates via SMS,
              email, or calls from DevaSetu — even if your number is on the DND
              registry.
            </p>

            <p className="font-medium">2.2 Business Transfers</p>
            <p>
              In the event of a merger, acquisition, or reorganization, your
              data may be transferred as part of that process, subject to this
              Policy.
            </p>

            {/* 3. COOKIES AND TRACKING */}
            <h4 className="font-semibold text-gray-900">
              3. COOKIES AND TRACKING TECHNOLOGIES
            </h4>
            <p>
              Cookies help improve user experience by analyzing behavior and
              preferences. You can disable cookies in your browser, but some
              features may not work properly. DevaSetu is not responsible for
              third-party cookie policies.
            </p>

            {/* 4. SHARING OF INFORMATION */}
            <h4 className="font-semibold text-gray-900">
              4. SHARING OF INFORMATION
            </h4>
            <p>We do not sell your personal data. However, we may share it:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>With Service Partners:</strong> To enable delivery of
                Services (e.g., astrologers, logistics providers).
              </li>
              <li>
                <strong>With Legal Authorities:</strong> When required by law or
                court order.
              </li>
              <li>
                <strong>With Advertising Partners:</strong> For analytics or
                relevant advertising, using non-identifiable data.
              </li>
              <li>
                <strong>For Security & Fraud Prevention:</strong> To resolve
                disputes or technical issues.
              </li>
            </ul>

            {/* 5. SECURITY OF INFORMATION */}
            <h4 className="font-semibold text-gray-900">
              5. SECURITY OF INFORMATION
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Encrypted data storage and secure transmission.</li>
              <li>Restricted access to authorized personnel only.</li>
              <li>Regular system audits and monitoring.</li>
            </ul>
            <p>
              While we employ best practices, no system is entirely secure. You
              use the Platform at your own risk.
            </p>

            {/* 6. DATA RETENTION */}
            <h4 className="font-semibold text-gray-900">6. DATA RETENTION</h4>
            <p>
              We retain your data only as long as necessary for service delivery
              or as required by law. For deletion requests, contact{" "}
              <strong>devasetu.corporate@gmail.com</strong>.
            </p>

            {/* 7. YOUR RIGHTS */}
            <h4 className="font-semibold text-gray-900">7. YOUR RIGHTS</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Withdraw Consent:</strong> You may withdraw data usage
                consent anytime by contacting us.
              </li>
              <li>
                <strong>Correction & Updates:</strong> Request data corrections
                via email.
              </li>
              <li>
                <strong>Account Deletion:</strong> Delete your account anytime
                via your profile or by email.
              </li>
            </ul>

            {/* 8. LINKS TO THIRD-PARTY SITES */}
            <h4 className="font-semibold text-gray-900">
              8. LINKS TO THIRD-PARTY SITES
            </h4>
            <p>
              We are not responsible for external sites’ privacy policies.
              Please review third-party policies before sharing any information.
            </p>

            {/* 9. CHILDREN’S PRIVACY */}
            <h4 className="font-semibold text-gray-900">
              9. CHILDREN’S PRIVACY
            </h4>
            <p>
              Services are intended for users aged 18+. We do not knowingly
              collect data from minors. If a child has shared information,
              contact us for deletion.
            </p>

            {/* 10. CHANGES TO THIS POLICY */}
            <h4 className="font-semibold text-gray-900">
              10. CHANGES TO THIS POLICY
            </h4>
            <p>
              We may update this Policy periodically. Changes will be indicated
              with a revised “Last Updated” date. Continued use means you accept
              updates.
            </p>

            {/* 11. GRIEVANCE OFFICER */}
            <h4 className="font-semibold text-gray-900">
              11. GRIEVANCE OFFICER
            </h4>
            <p>
              In accordance with Rule 5(9) of the IT Rules, 2011, please
              contact:
              <br />
              <strong>Grievance Officer</strong> <br />
              DevaSetu Technologies Private Limited <br />
              📍 Shree Niket, Mansinghka Residence, Opp. Raghuvansh Vihar
              Colony, Bhilwara, Rajasthan – 311001 <br />
              📞 +91 7877961501 <br />
              📧 devasetu.corporate@gmail.com
            </p>
            <p>
              Complaints will be acknowledged within 24 hours and resolved
              within 15 working days.
            </p>

            {/* 12. CONTACT */}
            <h4 className="font-semibold text-gray-900">
              12. CONTACT FOR PRIVACY QUESTIONS
            </h4>
            <p>
              For questions or concerns, please contact us at{" "}
              <strong>devasetu.corporate@gmail.com</strong>.
            </p>

            <p className="italic text-gray-600">
              By using our Platform, you acknowledge that you have read,
              understood, and agreed to this Privacy Policy.
            </p>
          </div>
        </Modal>
      )}

      {/* ✅ Terms & Conditions Modal */}
      {/* ✅ Terms & Conditions Modal */}
      {modal === "terms" && (
        <Modal title="Terms & Conditions">
          <div className="max-h-[75vh] overflow-y-auto text-gray-700 space-y-4 pr-2">
            <h3 className="text-lg font-bold text-gray-900">TERMS OF USE</h3>
            <p className="text-sm text-gray-500">
              Last Updated: 25th October 2025
            </p>

            <p>
              Welcome to <strong>DevaSetu.com</strong>, a digital platform
              operated by
              <strong> DevaSetu Technologies Private Limited</strong>, having
              its registered office at Shree Niket, Mansinghka Residence,
              Opposite Raghuvansh Vihar Colony, Bhilwara, Rajasthan – 311001
              (“Company”, “we”, “our”, or “us”).
            </p>
            <p>
              By using this website and our related applications or services
              (collectively referred to as the “Platform”), you (“user”, “you”,
              or “your”) agree to comply with and be legally bound by these
              Terms of Use, along with our Privacy Policy. If you do not agree,
              please refrain from accessing or using the Platform.
            </p>

            {/* 1. INTRODUCTION */}
            <h4 className="font-semibold text-gray-900">1. INTRODUCTION</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                DevaSetu.com is an online spiritual and devotional platform that
                provides access to spiritual content, digital puja services,
                astrology consultations, and devotional products (collectively,
                the “Services”).
              </li>
              <li>
                These Terms govern your use of the Platform and related content.
              </li>
              <li>
                This is an electronic record under the Information Technology
                Act, 2000 and requires no physical signature.
              </li>
            </ul>

            {/* 2. ACCEPTANCE OF TERMS */}
            <h4 className="font-semibold text-gray-900">
              2. ACCEPTANCE OF TERMS
            </h4>
            <p>
              By visiting or using the Platform, you agree to these Terms of Use
              and our Privacy Policy. You must be at least 18 years old and
              capable of entering into a legally binding contract under the
              Indian Contract Act, 1872.
            </p>

            {/* 3. ACCESS AND USAGE */}
            <h4 className="font-semibold text-gray-900">3. ACCESS AND USAGE</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                You are granted a limited, non-transferable, revocable license
                to use the Platform for personal, non-commercial purposes.
              </li>
              <li>
                You agree not to use the Platform for unlawful, harmful, or
                fraudulent purposes.
              </li>
              <li>
                Unauthorized use, scraping, or reverse engineering is
                prohibited.
              </li>
            </ul>

            {/* 4. USER REGISTRATION */}
            <h4 className="font-semibold text-gray-900">
              4. USER REGISTRATION
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Registration may be required for specific services using phone
                or email.
              </li>
              <li>
                You are responsible for keeping your credentials confidential.
              </li>
              <li>
                The Company reserves the right to suspend accounts with false
                information.
              </li>
            </ul>

            {/* 5. PAYMENT TERMS */}
            <h4 className="font-semibold text-gray-900">5. PAYMENT TERMS</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Some services require payment. You agree to pay all applicable
                fees.
              </li>
              <li>Prices are subject to change at our discretion.</li>
              <li>
                Payments are processed securely via third-party gateways.
                DevaSetu is not responsible for gateway errors.
              </li>
            </ul>

            {/* 6. CANCELLATION AND REFUND POLICY */}
            <h4 className="font-semibold text-gray-900">
              6. CANCELLATION AND REFUND POLICY
            </h4>

            <p className="font-semibold">6.1. Eligibility for Refunds</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Incorrect package or puja booked.</li>
              <li>Duplicate booking or double payment.</li>
              <li>Service disruption from DevaSetu’s side.</li>
              <li>Rescheduling not possible due to unavoidable reasons.</li>
            </ul>

            <p className="font-semibold">6.2. Non-Refundable Scenarios</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Incorrect or incomplete information by the user.</li>
              <li>Dissatisfaction with outcomes or predictions.</li>
              <li>Requests made after 7 days of service completion.</li>
              <li>Misuse or abuse of refund policies.</li>
            </ul>

            <p className="font-semibold">6.3. Processing of Refunds</p>
            <p>
              Approved refunds will be processed within 5–7 business days to the
              original payment method.
            </p>

            {/* 7. CONTENT AND INTELLECTUAL PROPERTY */}
            <h4 className="font-semibold text-gray-900">
              7. CONTENT AND INTELLECTUAL PROPERTY
            </h4>
            <p>
              All content on DevaSetu.com, including text, images, videos, and
              design, is the exclusive property of DevaSetu Technologies Private
              Limited or its licensors. Users are granted limited personal-use
              access only.
            </p>

            {/* 8. THIRD-PARTY LINKS */}
            <h4 className="font-semibold text-gray-900">
              8. THIRD-PARTY LINKS
            </h4>
            <p>
              The Platform may contain links to third-party websites. DevaSetu
              does not control or endorse these and is not responsible for their
              content or privacy practices.
            </p>

            {/* 9. USER RESPONSIBILITIES */}
            <h4 className="font-semibold text-gray-900">
              9. USER RESPONSIBILITIES
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>No offensive or illegal content.</li>
              <li>No harassment, hate speech, or harmful uploads.</li>
              <li>No interference or misuse of Platform resources.</li>
            </ul>

            {/* 10. LIMITATION OF LIABILITY */}
            <h4 className="font-semibold text-gray-900">
              10. LIMITATION OF LIABILITY
            </h4>
            <p>
              To the fullest extent permitted by law, DevaSetu shall not be
              liable for direct or indirect damages arising from use,
              unauthorized access, or reliance on the Platform’s content or
              services.
            </p>

            {/* 11. INDEMNIFICATION */}
            <h4 className="font-semibold text-gray-900">11. INDEMNIFICATION</h4>
            <p>
              You agree to indemnify and hold harmless DevaSetu Technologies
              Private Limited, its employees, and affiliates against any claims
              arising from your use or violation of these Terms.
            </p>

            {/* 12–18 Remaining sections condensed for brevity */}
            <h4 className="font-semibold text-gray-900">12. TERMINATION</h4>
            <p>
              DevaSetu may suspend or terminate access at any time for violation
              of these Terms.
            </p>

            <h4 className="font-semibold text-gray-900">13. DISCLAIMER</h4>
            <p>
              Services are provided “as is”. DevaSetu does not guarantee
              outcomes of spiritual or astrological services.
            </p>

            <h4 className="font-semibold text-gray-900">14. GOVERNING LAW</h4>
            <p>
              Governed by the laws of India. Courts in Bhilwara, Rajasthan, have
              exclusive jurisdiction.
            </p>

            <h4 className="font-semibold text-gray-900">15. SEVERABILITY</h4>
            <p>
              If any provision is found invalid, remaining provisions continue
              in effect.
            </p>

            <h4 className="font-semibold text-gray-900">
              16. MODIFICATION OF TERMS
            </h4>
            <p>
              DevaSetu may modify these Terms at any time. Continued use implies
              acceptance of changes.
            </p>

            <h4 className="font-semibold text-gray-900">17. CONTACT DETAILS</h4>
            <p>
              <strong>Grievance Officer</strong> <br />
              DevaSetu Technologies Private Limited <br />
              📍 Shree Niket, Mansinghka Residence, Opposite Raghuvansh Vihar
              Colony, Bhilwara, Rajasthan – 311001 <br />
              📞 +91 7877961501 <br />
              📧 devasetu.corporate@gmail.com
            </p>

            <h4 className="font-semibold text-gray-900">
              18. SOCIAL MEDIA LINKS
            </h4>
            <ul className="list-disc list-inside">
              <li>YouTube</li>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>LinkedIn</li>
              <li>WhatsApp Channel</li>
            </ul>
          </div>
        </Modal>
      )}
    </footer>
  );
}
