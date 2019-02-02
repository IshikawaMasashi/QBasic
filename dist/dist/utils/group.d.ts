import { View, ViewType } from "../components/editor/View";
import { File } from "../models";
import OpenEditorsTreeNode from "../components/openEditors/OpenEditorsTreeNode";
export default class Group extends OpenEditorsTreeNode {
    currentView: View;
    readonly views: View[];
    preview: View;
    collapsed: boolean;
    constructor(currentView: View, views?: View[]);
    private _name;
    name: string;
    rename(desiredName: string): Promise<boolean>;
    open(view: View, shouldPreview?: boolean): void;
    openFile(file: File, type?: ViewType, preview?: boolean): void;
    close(view: View): void;
    clone(): Group;
}
