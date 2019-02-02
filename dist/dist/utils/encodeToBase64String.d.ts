export declare function encodeToBase64String(file: Windows.Storage.StorageFile): Promise<string>;
export declare function imageToBase64(img: HTMLImageElement, mime_type: string): string;
export declare function base64ToImage(base64img: string, callback: (image: HTMLImageElement) => void): void;
