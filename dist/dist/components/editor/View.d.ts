import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import OpenEditorsTreeNode from "../openEditors/OpenEditorsTreeNode";
import { File, FileType } from "../../models";
export declare enum ViewType {
    Editor = 0,
    Markdown = 1,
    Binary = 2,
    Viz = 3
}
export declare function defaultViewTypeForFileType(type: FileType): ViewType.Editor | ViewType.Markdown | ViewType.Viz;
export declare function isViewFileDirty(view: View): boolean;
export declare class View extends OpenEditorsTreeNode {
    file: File;
    type: ViewType;
    state: monaco.editor.ICodeEditorViewState;
    collapsed: boolean;
    constructor(file: File, type?: ViewType);
    name: string;
    rename(desiredName: string): Promise<boolean>;
    getValue(): string;
    isDirty(): boolean;
    clone(): View;
}
