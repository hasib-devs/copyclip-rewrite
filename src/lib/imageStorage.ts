import { BaseDirectory, exists, mkdir, readFile, writeFile } from "@tauri-apps/plugin-fs";
import * as path from '@tauri-apps/api/path';

export const imagesDir = 'images';
export const baseDir = BaseDirectory.AppData;

export async function ensureImageDirExists() {
    if (!(await exists(imagesDir, { baseDir }))) {
        await mkdir(imagesDir, { baseDir });
    }
}


export function base64ToUint8Array(base64Img: string): Uint8Array {
    return new Uint8Array(
        atob(base64Img)
            .split("")
            .map((char) => char.charCodeAt(0))
    );
}

export async function saveImageFromBase64(base64Img: string, filename: string): Promise<string> {
    await ensureImageDirExists();

    const data = base64ToUint8Array(base64Img);
    const match = base64Img.match(/^data:image\/(\w+);base64,/);
    const fileExt = match ? match[1] : 'png';
    const imagePath = `${imagesDir}/${filename}.${fileExt}`;

    await writeFile(imagePath, data, { baseDir });
    const appDir = await path.appDataDir();
    return await path.join(appDir, imagePath);
}

export async function getImageFile(filePath: string) {
    return await readFile(filePath, { baseDir });
}