import type { Metadata } from "next";
import localFont from "next/font/local";
import Menu from "./Components/Menu/Menu";
import "../../public/style.css";
import Footer from "./Components/Footer/Footer";

const bespoke = localFont({
  src: "./fonts/BespokeSlabExtrabold.otf",
  variable: "--bespoke",
  weight: "100 900",
});
const poppins = localFont({
  src: "./fonts/PoppinsBold.ttf",
  variable: "--poppins",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pet Shop",
  description: "O pet shop mais famoso do brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${bespoke.variable} ${poppins.variable}`}>
        <Menu></Menu>
        {children}
        <Footer />
      </body>
    </html>
  );
}
