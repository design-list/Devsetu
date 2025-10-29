"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, Sparkles, Users2, Building2 } from "lucide-react";
import Temple from '../../../../../public/images/temple.jpeg';

export default function AboutPage() {
  return (
    <main className="AboutPage bg-[var(--color-background)] text-[var(--color-dark)] font-primary">
      {/* Hero Section */}
      <section className="relative bg-[var(--color-primary)] text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-secondary font-bold mb-4">
            About <span className="text-[var(--color-accent)]">DevaSetu</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/90">
            Bridging Devotion and Technology — bringing the divine closer to your home through authentic spiritual experiences.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-secondary font-bold text-[var(--color-primary)] mb-4">
              Who We Are
            </h2>
            <p className="leading-relaxed text-[var(--color-dark)] mb-4">
              DevaSetu is a spiritual technology platform built to simplify your
              devotional journey. Whether it’s performing online pujas, connecting
              with priests, or exploring sacred rituals — we make divine services
              accessible to everyone, everywhere.
            </p>
            <p className="leading-relaxed">
              Our mission is to preserve ancient traditions while embracing modern
              convenience — offering you a trusted gateway to spirituality,
              authenticity, and peace of mind.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src={Temple}
              alt="About DevaSetu"
              width={500}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="bg-[var(--color-primary-light)] text-white py-16">
        <div className="container grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white/10 rounded-2xl">
            <Sparkles className="mx-auto mb-3 w-10 h-10 text-[var(--color-accent)]" />
            <h3 className="font-secondary font-bold text-3xl mb-2">Our Mission</h3>
            <p className="text-sm leading-relaxed">
              To connect devotees with authentic spiritual experiences through
              seamless technology and trusted services.
            </p>
          </div>

          <div className="p-6 bg-white/10 rounded-2xl">
            <Building2 className="mx-auto mb-3 w-10 h-10 text-[var(--color-accent)]" />
            <h3 className="font-secondary font-bold text-3xl mb-2">Our Vision</h3>
            <p className="text-sm leading-relaxed">
              To become India’s most loved platform for spiritual discovery and
              divine connection.
            </p>
          </div>

          <div className="p-6 bg-white/10 rounded-2xl">
            <HeartHandshake className="mx-auto mb-3 w-10 h-10 text-[var(--color-accent)]" />
            <h3 className="font-secondary font-bold text-3xl mb-2">Our Promise</h3>
            <p className="text-sm leading-relaxed">
              Authenticity, transparency, and devotion — every service is performed
              with care and faith.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-secondary font-bold text-[var(--color-primary)] mb-4">
            Our Journey
          </h2>
          <p className="max-w-2xl mx-auto text-[var(--color-dark)]">
            From a small initiative to a trusted platform serving thousands of
            devotees — our journey is powered by faith, love, and your trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-[var(--color-primary)] rounded-2xl text-center">
            <Users2 className="mx-auto mb-3 w-10 h-10 text-[var(--color-primary)]" />
            <h3 className="font-secondary font-bold text-3xl text-[var(--color-dark)] mb-1">10,000+ Devotees</h3>
            <p className="text-lg text-[var(--color-dark)]">
              Serving families across India and abroad with devotion.
            </p>
          </div>

          <div className="p-6 border border-[var(--color-primary)] rounded-2xl text-center">
            <Sparkles className="mx-auto mb-3 w-10 h-10 text-[var(--color-primary)]" />
            <h3 className="font-secondary font-bold text-3xl text-[var(--color-dark)] mb-1">100+ Verified Pandits</h3>
            <p className="text-lg text-[var(--color-dark)]">
              Experienced priests performing authentic rituals as per Vedic
              traditions.
            </p>
          </div>

          <div className="p-6 border border-[var(--color-primary)] rounded-2xl text-center">
            <Building2 className="mx-auto mb-3 w-10 h-10 text-[var(--color-primary)]" />
            <h3 className="font-secondary font-bold text-3xl text-[var(--color-dark)] mb-1">Pan-India Coverage</h3>
            <p className="text-lg text-[var(--color-dark)]">
              Serving temples and devotees from every corner of India.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-accent)] py-16 text-center text-[var(--color-dark)]">
        <div className="container">
          <h2 className="text-4xl font-secondary font-bold mb-4">
            Join Our Devotional Family
          </h2>
          <p className="max-w-xl mx-auto mb-6">
            Be part of the growing DevaSetu community and experience the divine
            from the comfort of your home.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[var(--color-primary)] text-white font-proxi-bold px-8 py-3 rounded-full hover:bg-[var(--color-primary-light)] transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
