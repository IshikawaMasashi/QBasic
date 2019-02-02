import * as React from "react";
import { View } from "./editor";
import { Project, File, Directory, ModelRef } from "../models";
import { SplitInfo } from "./Split";
import Group from "../utils/group";
import { ExplorerItem, ExplorerFile, ExplorerFolder, ExplorerRootFolder } from "../components/explorer";
import { Key } from "./treeView";
import { QBasicProgram } from "../qbasic";
import OpenEditorsTreeNode from "./openEditors/OpenEditorsTreeNode";
declare type AppState = {
    project: ModelRef<Project>;
    file: ModelRef<File>;
    fiddle: string;
    /**
     * If not null, the the new file dialog is open and files are created in this
     * directory.
     */
    newFileDialogDirectory?: ModelRef<Directory>;
    /**
     * If not null, the the edit file dialog is open.
     */
    editFileDialogFile: ExplorerFile | ExplorerFolder;
    /**
     * If true, the share fiddle dialog is open.
     */
    shareDialog: boolean;
    /**
     * If true, the new project dialog is open.
     */
    newProjectDialog: boolean;
    /**
     * Primary workspace split state.
     */
    workspaceSplits: SplitInfo[];
    /**
     * Secondary control center split state.
     */
    controlCenterSplits: SplitInfo[];
    /**
     * Editor split state.
     */
    editorSplits: SplitInfo[];
    /**
     * If not null, the upload file dialog is open.
     */
    uploadFileDialogDirectory: ModelRef<Directory>;
    /**
     * If true, the new directory dialog is open.
     */
    newDirectoryDialog: ModelRef<Directory>;
    showProblems: boolean;
    showSandbox: boolean;
    tabGroups: Group[];
    activeTabGroup: Group;
    hasStatus: boolean;
    isContentModified: boolean;
    windowDimensions: string;
    folders: ExplorerRootFolder[];
    newFileDialogFolder?: ExplorerFolder;
    renameLabelId: string;
    renameDialogItem: ExplorerItem | OpenEditorsTreeNode;
    openEditorsSelectedKeys: Set<Key>;
    quickBasicProgram?: QBasicProgram;
    output: string;
    schemeCode?: string;
    closeFile: View;
};
declare type AppProps = {
    /**
     * If true, the Update button is visible.
     */
    update: boolean;
    fiddle: string;
    embeddingParams: EmbeddingParams;
    windowContext: AppWindowContext;
};
export declare enum EmbeddingType {
    None = 0,
    Default = 1,
    Arc = 2
}
export interface EmbeddingParams {
    type: EmbeddingType;
    templatesName: string;
}
export interface AppWindowContext {
    promptWhenClosing: boolean;
}
export declare class App extends React.Component<AppProps, AppState> {
    private toastContainer;
    private pathMap;
    constructor(props: AppProps);
    private initializeProject;
    private static getWindowDimensions;
    private loadProjectFromFiddle;
    bindAppStoreEvents(): void;
    loadReleaseNotes(): Promise<void>;
    loadHelp(): Promise<void>;
    handleKeyDown: (ev: KeyboardEvent) => void;
    registerShortcuts(): void;
    logLn(message: string, kind?: "" | "info" | "warn" | "error"): void;
    componentWillMount(): void;
    componentDidMount(): void;
    share(): void;
    update(): Promise<void>;
    fork(): Promise<void>;
    gist(fileOrDirectory?: File): Promise<void>;
    download(): Promise<void>;
    private openFile;
    private onNewFile;
    /**
     * Remember workspace split.
     */
    private workspaceSplit;
    toolbarButtonsAreDisabled(): boolean;
    makeToolbarButtons(): JSX.Element[];
    onDrop(event: DragEvent): void;
    readonly setQuickBasicProgram: (quickBasicProgram?: QBasicProgram) => void;
    readonly setSchemeCode: (schemeCode?: string) => void;
    readonly setOutput: (output: string) => void;
    render(): JSX.Element;
}
export {};
