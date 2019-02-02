import "../treeView/index.css";
import "./index.css";
import "./tree.css";
import * as React from "react";
import { TreeRowInfo, Key } from "../treeView";
import OpenEditorsTreeNode from './OpenEditorsTreeNode';
import Group from "../../utils/group";
declare type OpenEditorsTreeProps = {
    tabGroups: Group[];
    selectedKeys: Set<Key>;
    onSelectedKeysChange: (selectedKeys: Set<Key>, selectedInfos: TreeRowInfo[]) => void;
};
declare type OpenEditorsTreeState = {
    root: OpenEditorsTreeNode;
};
export default class OpenEditorsTree extends React.Component<OpenEditorsTreeProps, OpenEditorsTreeState> {
    private clickCount;
    private selectedItems;
    constructor(props: OpenEditorsTreeProps);
    render(): JSX.Element;
    renderRow: (info: TreeRowInfo) => JSX.Element;
    onContextMenu: (info: TreeRowInfo, _ev: React.MouseEvent<Element>) => void;
    readonly onSelectedKeysChange: (selectedKeys: Set<React.Key>, selectedInfos: TreeRowInfo[]) => void;
    readonly onCollapsedChange: (info: TreeRowInfo, collapsed: boolean) => void;
    readonly onMove: (src: TreeRowInfo[], _dest: TreeRowInfo, _destIndex: number, destPathAfterMove: number[]) => void;
    readonly onCopy: (src: TreeRowInfo[], dest: TreeRowInfo, destIndex: number) => void;
}
export {};
