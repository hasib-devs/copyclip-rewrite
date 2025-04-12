import { IMAGE_QUALITY } from "./constants";

export function maskCreditCards(text: string) {
    return text.replace(/\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm, '****-****-****-');
}

export function detectContentType(text: string) {
    if (/^https?:\/\//.test(text)) return 'link';
    if (/^\d+$/.test(text)) return 'number';
    return 'text';
}

// export async function compressImage(b64: string) {
//     const worker = new Worker('./image-processor.worker');
//     worker.postMessage(b64);
//     return new Promise(resolve => worker.onmessage = e => resolve(e.data));
// }

export function calculateBase64Size(base64: string) {
    const padding = (base64.match(/=+$/) || [''])[0].length;
    return (base64.length * 3) / 4 - padding;
}

// Image compression
export async function compressImage(b64: string): Promise<string> {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = b64;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob!);
                },
                'image/jpeg',
                0.7
            );
        };
    });
}