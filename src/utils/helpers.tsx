export function maskCreditCards(text: string) {
    return text.replace(/\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm, '****-****-****-');
} 