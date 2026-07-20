import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as { role?: string })?.role;
  const isAdmin = role === "ADMIN";

  const customerRoutes = [
    "/dashboard",
    "/orders",
    "/bookings",
    "/wishlist",
    "/profile",
    "/addresses",
  ];

  const isCustomerRoute = customerRoutes.some((r) =>
    nextUrl.pathname.startsWith(r),
  );

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  const isAuthRoute =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register");

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (isCustomerRoute && !isLoggedIn) {
    return NextResponse.redirect(
      new URL(
        `/login?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`,
        nextUrl,
      ),
    );
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL(isLoggedIn ? "/" : "/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};

// import { auth } from "@/lib/auth";
// import { NextResponse } from "next/server";

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;
//   const role = (req.auth?.user as { role?: string })?.role;
//   const isAdmin = role === "ADMIN";

//   const customerRoutes = ["/dashboard", "/orders", "/bookings", "/wishlist", "/profile", "/addresses"];
//   const isCustomerRoute = customerRoutes.some((r) => nextUrl.pathname.startsWith(r));
//   const isAdminRoute = nextUrl.pathname.startsWith("/admin");
//   const isAuthRoute = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");

//   if (isAuthRoute && isLoggedIn) {
//     return NextResponse.redirect(new URL("/dashboard", nextUrl));
//   }
//   if (isCustomerRoute && !isLoggedIn) {
//     return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`, nextUrl));
//   }
//   if (isAdminRoute && !isAdmin) {
//     return NextResponse.redirect(new URL(isLoggedIn ? "/" : "/login", nextUrl));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
// };
