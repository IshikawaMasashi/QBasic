import { File } from "../models/File";
export declare function pickSingleFileAsync(): Promise<void>;
export declare function saveFileAsync(file: File): Promise<boolean>;
export declare function saveAsFileAsync(file: File): Promise<boolean>;
