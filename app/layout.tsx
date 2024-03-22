import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "./components/Navbar";
import StyleProvider from "./StyleContext";
import Body from "./components/styleComponents/Body";
import { getTheme } from "./mongo/Controller/themeController";

const poppins = Poppins({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Taskey",
  description: "Customizable Task Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getThemeAction = async () => {
    'use server';
    const res = await getTheme();
    if(res.success) {
      return res.theme;
    } else {
      return null;
    }
  }
  return (
    <html lang="en">
      <UserProvider>
        <StyleProvider getThemeAction = { getThemeAction } themeName="lightBlue">
          <Body className={poppins.className}>
            <Navbar />
            {children}
          </Body>
        </StyleProvider>
      </UserProvider>
    </html>
  );
}
