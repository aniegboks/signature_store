import type { Metadata } from "next";
import { Cormorant_Infant, Urbanist, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import "../../app/globals.css";
import { SanityLive } from "@/sanity/lib/live";
import Footer from "@/components/footer";
import { ReactLenis } from "@/utils/lenis";

const cormorant_infant = Cormorant_Infant({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

// Keeping the mono font available globally, but removing it from the primary UI elements
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Signature.",
  description: "A curated editorial archive of structural garments and timeless silhouettes.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      dynamic
      appearance={{
        layout: {
          socialButtonsVariant: "blockButton",
          // Turning off shimmer for a more grounded, physical editorial feel
          shimmer: false,
        },
        variables: {
          colorPrimary: "#171717", // Crisp Neutral Black
          colorBackground: "#ffffff",
          colorText: "#171717",
          colorTextSecondary: "#737373", // Neutral-500 for subtle copy
          colorInputBackground: "#ffffff",
          colorInputText: "#171717",
          borderRadius: "0px", // Strict, architectural corners
          fontFamily: "var(--font-urbanist)",
        },
        elements: {
          // Clean, shadow-lifted white card
          card: "border border-black/[0.04] bg-white shadow-2xl rounded-none p-4 md:p-8",

          // Editorial typography for the Auth headers
          headerTitle: "font-cormorant italic tracking-tight text-4xl md:text-5xl text-neutral-900",
          headerSubtitle: "font-sans text-xs font-light text-neutral-500 mt-2",

          // Widely tracked, minimalist labels
          formFieldLabel: "font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-2",
          formFieldInput: "border-black/[0.08] focus:border-black focus:ring-0 transition-colors rounded-none px-4 py-3 text-sm font-light",

          // Heavy, stark submit button
          formButtonPrimary: "bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-500 font-sans uppercase tracking-[0.2em] text-[10px] h-12 rounded-none",

          // Refined social login buttons
          socialButtonsBlockButton: "border border-black/[0.08] bg-transparent hover:bg-neutral-50 transition-colors duration-300 rounded-none h-12",
          socialButtonsBlockButtonText: "font-sans text-[10px] uppercase tracking-[0.15em] text-neutral-600",

          // Clean footer links
          footerActionLink: "text-neutral-900 hover:text-neutral-500 transition-colors border-b border-neutral-900 pb-0.5",
          dividerLine: "bg-black/[0.04]",
          dividerText: "font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-300"
        }
      }}
    >
      <html lang="en">
        <ReactLenis root>
          {/* Changed base theme to the high-end #FAFAFA light background */}
          <body className={`${urbanist.variable} ${cormorant_infant.variable} ${jetbrainsMono.variable} antialiased bg-[#FAFAFA] text-neutral-900`}>

            <Header />

            <main className="min-h-screen relative">
              {children}
            </main>

            <Footer />
            <SanityLive />

          </body>
        </ReactLenis>
      </html>
    </ClerkProvider>
  );
}