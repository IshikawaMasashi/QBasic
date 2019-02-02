export declare function readTextFromStorageFile(file: Windows.Storage.StorageFile): Promise<string>;
export declare function writeTextFromStorageFile(file: Windows.Storage.StorageFile, contents: string): Promise<void>;
export declare function pickSaveFileAsync(suggestedFileName?: string): Promise<Windows.Storage.StorageFile>;
export declare function uwpPickMultipleFilesAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
export declare function pickSingleFolderAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
