import OpenEditorsTreeNode from './OpenEditorsTreeNode';
export default class RootNode extends OpenEditorsTreeNode {
    collapsed: boolean;
    constructor(children: OpenEditorsTreeNode[], collapsed: boolean);
    readonly name: string;
    rename(desiredName: string): Promise<boolean>;
    clone(): RootNode;
}
