import type { Metadata } from "next";
import { Cormorant_Infant, Urbanist, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs"; // <--- THE FIX
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Signature Series",
  description: "High-performance curation and digital archives.",
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
          shimmer: true,
        },
        variables: {
          colorPrimary: "#f97316", 
          colorBackground: "#050505", 
          colorText: "#ffffff",
          colorTextSecondary: "rgba(255,255,255,0.4)",
          colorInputBackground: "rgba(255,255,255,0.03)",
          colorInputText: "#ffffff",
          borderRadius: "0px", 
          fontFamily: "var(--font-urbanist)",
        },
        elements: {
          // HUD Card Styling
          card: "border border-white/10 bg-[#050505] shadow-[0_0_60px_rgba(249,115,22,0.05)] relative overflow-visible " +
                "before:content-[''] before:absolute before:-top-2 before:-left-2 before:w-6 before:h-6 before:border-t before:border-l before:border-orange-500/50 " +
                "after:content-[''] after:absolute after:-bottom-2 after:-right-2 after:w-6 after:h-6 before:border-b before:border-r before:border-orange-500/50",
          
          headerTitle: "font-cormorant italic tracking-tighter text-4xl",
          headerSubtitle: "font-mono text-[9px] uppercase tracking-[0.4em] text-orange-500/60 mt-2",
          
          formFieldLabel: "font-mono text-[8px] uppercase tracking-[0.3em] text-white/30",
          formFieldInput: "border-white/10 focus:border-orange-500 focus:ring-0 transition-all font-mono",
          
          formButtonPrimary: "bg-white text-black hover:bg-orange-500 hover:text-white transition-all duration-500 font-mono uppercase tracking-[0.3em] text-[10px] h-14",
          
          socialButtonsBlockButton: "bg-white/5 border-white/10 hover:bg-white/10 transition-all rounded-none",
          socialButtonsBlockButtonText: "font-mono text-[10px] uppercase tracking-widest text-white/70",
          
          footerActionLink: "text-orange-500 hover:text-white transition-colors font-bold",
          dividerLine: "bg-white/5",
          dividerText: "font-mono text-[8px] uppercase tracking-[0.5em] text-white/10"
        }
      }}
    >
      <html lang="en">
        <ReactLenis root>
          <body className={`${urbanist.variable} ${cormorant_infant.variable} ${jetbrainsMono.variable} antialiased bg-[#050505] text-white`}>
            <Header />
            <main className="min-h-screen relative">
              {/* Optional Background Scanline Effect */}
              <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />
              
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