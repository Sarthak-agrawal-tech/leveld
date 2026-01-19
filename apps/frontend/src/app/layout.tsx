import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "../context/UserContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-red-300`}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
