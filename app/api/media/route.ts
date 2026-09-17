import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".avi"]);

function readDir(dir: string): string[] {
  try {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext);
    });
  } catch {
    return [];
  }
}

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");

  // Images — only root /media/Images/ (not subfolders which are internal assets)
  const imagesDir = path.join(publicDir, "media", "Images");
  const imageFiles = readDir(imagesDir).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return IMAGE_EXTS.has(ext);
  });

  // Videos — /media/videos/
  const videosDir = path.join(publicDir, "media", "videos");
  const videoFiles = readDir(videosDir).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return VIDEO_EXTS.has(ext);
  });

  return NextResponse.json({
    images: imageFiles.map((f) => `/media/Images/${f}`),
    videos: videoFiles.map((f) => `/media/videos/${f}`),
  });
}
