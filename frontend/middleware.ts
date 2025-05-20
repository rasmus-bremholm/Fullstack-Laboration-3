// Här sker magin. Vart så trött på att behöva logga in hela tiden.
// Middleware är tänk att intercepta routes innan dom sker,
// så jag tänker att jag kollar ifall användaren är inloggad och ifall dom inte är det, skickar dom till loginsidan

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value;

	// Alla andra url än /login är "skyddade"
	const isAuthedPath = req.nextUrl.pathname !== "/login";

	if (!token && isAuthedPath) {
		const url = req.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	} else {
		return NextResponse.next();
	}
}

// Enligt Vercels docs så skyddar denna från allt i public mappen att hindras.
export const config = {
	matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
