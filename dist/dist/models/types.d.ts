import { logKind } from "../actions/AppActions";
import { Project } from "./Project";
export declare enum FileType {
    C = "c",
    Cpp = "cpp",
    Cretonne = "cretonne",
    CSS = "css",
    Directory = "directory",
    DOT = "dot",
    HTML = "html",
    JavaScript = "javascript",
    JSON = "json",
    Log = "log",
    Markdown = "markdown",
    Rust = "rust",
    Solution = "sln",
    TOML = "toml",
    TypeScript = "typescript",
    TypeScriptReact = "typescriptreact",
    Unknown = "unknown",
    Wasm = "wasm",
    Wat = "wat",
    x86 = "x86",
    Jsproj = "jsproj",
    PNG = "png",
    QuickBASIC = "quickbasic",
    Scheme = "scheme"
}
export interface SandboxRun {
    project: Project;
    src: string;
}
export interface IStatusProvider {
    push(status: string): void;
    pop(): void;
    logLn(message: string, kind?: logKind): void;
}
export declare function isBinaryFileType(type: FileType): boolean;
export declare function languageForFileType(type: FileType): string;
export declare function nameForFileType(type: FileType): string;
export declare function extensionForFileType(type: FileType): string;
export declare function fileTypeFromFileName(name: string): FileType;
export declare function fileTypeForExtension(extension: string): FileType;
export declare function mimeTypeForFileType(type: FileType): string;
export declare function fileTypeForMimeType(type: string): FileType;
export declare function getIconForFileType(fileType: FileType): string;
