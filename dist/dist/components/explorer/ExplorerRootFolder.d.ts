import { ExplorerItem } from './ExplorerItem';
import { ExplorerFolder } from './ExplorerFolder';
export declare class ExplorerRootFolder extends ExplorerFolder {
    readonly storageFolder: Windows.Storage.StorageFolder;
    collapsed: boolean;
    constructor(storageFolder: Windows.Storage.StorageFolder, children: ExplorerItem[], collapsed: boolean);
    clone(): ExplorerRootFolder;
}
