import { ExplorerItem } from "./ExplorerItem";
export declare class ExplorerFolder extends ExplorerItem {
    readonly storageFolder: Windows.Storage.StorageFolder;
    collapsed: boolean;
    constructor(parent: ExplorerFolder, storageFolder: Windows.Storage.StorageFolder, children: ExplorerItem[], collapsed: boolean);
    readonly name: string;
    readonly path: string;
    refresh(): Promise<void>;
    collapseAll(): void;
    rename(desiredName: string): Promise<boolean>;
    delete(): Promise<boolean>;
    load(): Promise<void>;
    launchFolderAsync(): void;
    clone(): ExplorerFolder;
}
