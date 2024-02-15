import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "./components/Navbar";
import StyleProvider from "./StyleContext";
import Body from "./components/styleComponents/Body";
import { getTheme } from "./mongo/Controller/themeController";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await getTheme();
  return (
    <html lang="en">
      <UserProvider>
        <StyleProvider theme = {result.success ? result.theme : undefined} themeName="lightBlue">
          <Body className={inter.className}>
            <Navbar />
            {children}
          </Body>
        </StyleProvider>
      </UserProvider>
    </html>
  );
}
