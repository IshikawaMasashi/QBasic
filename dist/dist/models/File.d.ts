import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { FileType, IStatusProvider } from "./types";
import { Directory } from "./Directory";
import { EventDispatcher } from "./EventDispatcher";
import { Problem } from "./Problem";
import { Project } from "./Project";
export declare class File {
    name: string;
    storageFile?: Windows.Storage.StorageFile;
    parentStorageFolder: Windows.Storage.StorageFolder;
    data: string | ArrayBuffer;
    parent: Directory;
    onClose?: Function;
    /**
     * True if the buffer is out of sync with the data.
     */
    isDirty: boolean;
    isBufferReadOnly: boolean;
    /**
     * True if the file is temporary. Transient files are usually not serialized to a
     * backing store.
     */
    isTransient: boolean;
    readonly onDidChangeData: EventDispatcher;
    readonly onDidChangeBuffer: EventDispatcher;
    readonly onDidChangeProblems: EventDispatcher;
    readonly onDidChangeDirty: EventDispatcher;
    readonly key: string;
    readonly buffer?: monaco.editor.IModel;
    _onDidChangeDirty: () => void;
    /**
     * File type of the buffer. This may be different than this file's type, true for
     * non-text files.
     */
    bufferType: FileType;
    description: string;
    problems: Problem[];
    constructor(name: string, storageFile?: Windows.Storage.StorageFile);
    getFileType(): FileType;
    getParentAsync(): Promise<Windows.Storage.StorageFolder>;
    rename(desiredName: string): Promise<boolean>;
    setNameAndDescription(name: string, description: string): void;
    notifyDidChangeBuffer(): void;
    notifyDidChangeData(): void;
    notifyDidChangeDirty(): void;
    private resetDirty;
    private updateBuffer;
    setProblems(problems: Problem[]): void;
    getEmitOutput(): Promise<any>;
    setData(data: string | ArrayBuffer, status?: IStatusProvider): void;
    getData(): string | ArrayBuffer;
    getProject(): Project;
    getDepth(): number;
    /**
     * Gets the path up to the base, if specified.
     */
    getPath(base?: Directory): string;
    save(): Promise<boolean>;
    saveAs(): Promise<boolean>;
    getValue(): string;
    toString(): string;
    isDescendantOf(element: File): boolean;
}
