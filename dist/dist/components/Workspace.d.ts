import * as React from "react";
import { Project, File, Directory, ModelRef } from "../models";
import { SplitInfo } from "./Split";
import { ExplorerRootFolder } from "./explorer";
import Group from "../utils/group";
export interface WorkspaceProps {
    /**
     * Active file.
     */
    file: ModelRef<File>;
    project: ModelRef<Project>;
    tabGroups: Group[];
    folders: ExplorerRootFolder[];
    onDeleteFile?: (file: File) => void;
    onMoveFile?: (file: File, directory: Directory) => void;
    onRenameFile?: (file: File) => void;
    onNewDirectory?: (directory: Directory) => void;
    onClickFile: (file: File) => void;
    onDoubleClickFile?: (file: File) => void;
    onUploadFile?: (directory: Directory) => void;
    onCreateGist: (fileOrDirectory: File) => void;
}
export interface WorkSpaceState {
    splits: SplitInfo[];
}
export declare class Workspace extends React.Component<WorkspaceProps, WorkSpaceState> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    refreshTree: () => void;
    readonly handleClick: () => void;
    render(): JSX.Element;
}
