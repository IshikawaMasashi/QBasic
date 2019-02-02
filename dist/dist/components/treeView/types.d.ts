export declare type Key = string | number;
export declare abstract class TreeNode {
    children: TreeNode[] | undefined;
    collapsed: boolean;
    canDrag: boolean;
    static nextKey: number;
    readonly key: number;
}
export interface TreeRowInfo {
    node: TreeNode;
    selected: boolean;
    path: number[];
    visible: boolean;
    visibleOffset: number;
}
