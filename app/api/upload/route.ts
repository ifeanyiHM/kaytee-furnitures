import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const data = "ironman";
  console.log(req, data);
}

// export async function POST(req: NextRequest) {
//   const session = await auth();
//   if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { image, folder } = await req.json();
//   if (!image) return NextResponse.json({ error: "No image provided" }, { status: 400 });

//   const result = await uploadImage(image, folder || "Kaytee-Furnitures");
//   return NextResponse.json(result);
// }
