import { ExplorerItem } from './ExplorerItem';
import { ExplorerFolder } from './ExplorerFolder';
import { File } from "../../models";
export declare class ExplorerFile extends ExplorerItem {
    readonly storageFile: Windows.Storage.StorageFile;
    collapsed: boolean;
    file: File;
    constructor(parent: ExplorerFolder, storageFile: Windows.Storage.StorageFile, collapsed: boolean);
    readonly name: string;
    readonly path: string;
    rename(desiredName: string): Promise<boolean>;
    delete(): Promise<boolean>;
    open(preview?: boolean): void;
    clone(): ExplorerFile;
}
