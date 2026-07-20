import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: string,
  folder = "luxe-interiors"
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function getOptimizedUrl(
  url: string,
  { width, height, quality = "auto" }: { width?: number; height?: number; quality?: string | number } = {}
): string {
  if (!url.includes("cloudinary.com")) return url;
  const transformations = [`q_${quality}`, "f_auto"];
  if (width)  transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  return url.replace("/upload/", `/upload/${transformations.join(",")}/`);
}

export default cloudinary;
