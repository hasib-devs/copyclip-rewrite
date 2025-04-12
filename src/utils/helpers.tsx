export function maskCreditCards(text: string) {
    return text.replace(/\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm, '****-****-****-');
}

export function detectContentType(text: string) {
    if (/^https?:\/\//.test(text)) return 'link';
    if (/^\d+$/.test(text)) return 'number';
    return 'text';
}

export async function compressImage(b64: string) {
    const worker = new Worker('./image-processor.worker');
    worker.postMessage(b64);
    return new Promise(resolve => worker.onmessage = e => resolve(e.data));
}