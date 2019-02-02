import * as React from "react";
import { IStatusProvider } from "../../models";
import { View, ViewType } from "./View";
import Group from "../../utils/group";
import { QBasicProgram } from "../../qbasic";
import OpenEditorsTreeNode from "../openEditors/OpenEditorsTreeNode";
export interface ViewTabsProps {
    groupIndex: number;
    group?: Group;
    groups: Group[];
    /**
     * Currently active view tab.
     */
    view: View;
    /**
     * View tabs.
     */
    views: View[];
    /**
     * View tab that is marked as a preview tab.
     */
    preview?: View;
    /**
     * Called when a view tab is clicked.
     */
    onClickView?: (view: View) => void;
    /**
     * Called when a view tab is double clicked.
     */
    onDoubleClickView?: (view: View) => void;
    /**
     * Called when a view tab is closed.
     */
    onClose?: (view: View) => void;
    /**
     * Called when a view tab's view type is changed.
     */
    onChangeViewType?: (view: View, type: ViewType) => void;
    /**
     * Called when the creation of a new view is requeted.
     */
    onNewFile?: () => void;
    /**
     * Called when the view tabs receive focus.
     */
    onFocus?: () => void;
    hasFocus?: boolean;
    /**
     * Called when view tabs are split.
     */
    onSplitViews?: () => void;
    setQuickBasicProgram: (quickBasicProgram?: QBasicProgram) => void;
    setOutput: (output: string) => void;
    setSchemeCode: (schemeCode: string) => void;
    rename: (renameLabelId: string, renameDialogItem: OpenEditorsTreeNode) => void;
    setCloseFile: (closeFile: View) => void;
}
export interface ViewTabsState {
    isActiveViewFileDirty: boolean;
}
export declare class ViewTabs extends React.Component<ViewTabsProps, ViewTabsState> {
    status: IStatusProvider;
    constructor(props: any);
    handleKeyDown: (ev: KeyboardEvent) => boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: ViewTabsProps): void;
    onFileDidChangeDirty: () => void;
    onDrop: (e: React.DragEvent<HTMLElement>) => void;
    renderViewCommands(): JSX.Element[];
    render(): JSX.Element;
}
