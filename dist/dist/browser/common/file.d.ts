export declare function nativePickSingleSaveFileAsync(name: string, content: string): void;
export declare function nativePickSingleOpenFileAsync(): Promise<{
    name: string;
    content: string;
}>;
export declare function getFile(strUrl: string): string;
