/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./utils/authcontext";

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
			<head>
				{/* Och varför i helvete funkar inte detta nu då när jag deployar till vercel? */}
				<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional' />
			</head>
			<body className={`${inter.variable}`}>
				<AuthProvider>
					<ToastContainer position='top-right' autoClose={5000} pauseOnHover transition={Bounce} />
					<div className='grid-container'>
						<Navbar />
						<main>{children}</main>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
}
