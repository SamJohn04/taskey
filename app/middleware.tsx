import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { user } = await getSession() ?? {};
    if (!user) {
        return NextResponse.redirect('/');
    }
}