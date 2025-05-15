import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";

// Inter funkar bra här.
const inter = Inter({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Fullstack Lab 3 | Rasmus Bremholm",
	description: "Min Laboration 3 i Fullstack kursen, Nextjs Express och PostgreSQL",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.variable}`}>
				<div className='grid-container'>
					<Navbar />
					<main>{children}</main>
				</div>
			</body>
		</html>
	);
}
