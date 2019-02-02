/// <reference types="react" />
import { ExplorerItem, ExplorerFolder, ExplorerRootFolder } from "../components/explorer";
import OpenEditorsTreeNode from "../components/openEditors/OpenEditorsTreeNode";
import { TreeRowInfo, Key } from "../components/treeView";
declare type WorkspaceContext = {
    openEditorsSelectedKeys: Set<Key>;
    openEditorsOnSelectedKeysChange: (selectedKeys: Set<Key>, selectedInfos: TreeRowInfo[]) => void;
    onNewFile: (folder: ExplorerFolder) => void;
    onEditFile: (file: ExplorerItem) => void;
    onClose: (folder: ExplorerRootFolder) => void;
    rename: (renameLabelId: string, renameDialogItem: ExplorerItem | OpenEditorsTreeNode) => void;
};
declare const _default: import("react").Context<WorkspaceContext>;
export default _default;
