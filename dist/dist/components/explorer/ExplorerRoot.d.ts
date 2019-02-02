import { ExplorerItem } from './ExplorerItem';
export declare class ExplorerRoot extends ExplorerItem {
    collapsed: boolean;
    constructor(children: ExplorerItem[], collapsed: boolean);
    readonly name: string;
    readonly path: string;
    rename(desiredName: string): Promise<boolean>;
    clone(): ExplorerRoot;
}
