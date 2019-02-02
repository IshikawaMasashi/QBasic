import { TreeNode } from '../treeView';
import { ExplorerFolder } from './ExplorerFolder';
export declare abstract class ExplorerItem extends TreeNode {
    readonly parent: ExplorerFolder | null;
    children: ExplorerItem[] | undefined;
    canDrag: boolean;
    canDrop: boolean;
    isLoaded: boolean;
    constructor(parent: ExplorerFolder | null, children: ExplorerItem[] | undefined, canDrag?: boolean, canDrop?: boolean);
    abstract readonly name: string;
    abstract readonly path: string;
    abstract rename(desiredName: string): Promise<boolean>;
    abstract clone(): ExplorerItem;
    getDescendant(path: number[]): ExplorerItem | undefined;
}
