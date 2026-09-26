import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ajay Padilam | Senior Android Developer & Team Lead",
  description: "Portfolio of Ajay Padilam, a Senior Android Developer specializing in Kotlin, Jetpack Compose, and MVI architecture.",
  keywords: ["Android Developer", "Senior Android Developer", "Kotlin Developer", "Jetpack Compose Developer", "Android Team Lead"],
  openGraph: {
    title: "Ajay Padilam | Senior Android Developer",
    description: "Portfolio of Ajay Padilam, a Senior Android Developer specializing in Kotlin, Jetpack Compose, and MVI architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
