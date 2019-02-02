import { TreeNode } from '../treeView';
export default abstract class OpenEditorsTreeNode extends TreeNode {
    children: OpenEditorsTreeNode[] | undefined;
    canDrag: boolean;
    canDrop: boolean;
    parent?: OpenEditorsTreeNode;
    abstract collapsed: boolean;
    constructor(children: OpenEditorsTreeNode[] | undefined, canDrag?: boolean, canDrop?: boolean);
    abstract name: string;
    abstract rename(desiredName: string): Promise<boolean>;
    getDescendant(path: number[]): OpenEditorsTreeNode | undefined;
    abstract clone(): OpenEditorsTreeNode;
}
