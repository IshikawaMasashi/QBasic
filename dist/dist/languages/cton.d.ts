import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import IRichLanguageConfiguration = monaco.languages.LanguageConfiguration;
export declare const Cton: {
    MonarchDefinitions: {
        keywords: string[];
        typeKeywords: string[];
        operators: any;
        symbols: RegExp;
        escapes: RegExp;
        tokenizer: {
            root: any;
            string: ((string | RegExp)[] | (RegExp | {
                token: string;
                bracket: string;
                next: string;
            })[])[];
            whitespace: (string | RegExp)[][];
        };
    };
    LanguageConfiguration: IRichLanguageConfiguration;
    CompletionItemProvider: {
        provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.IPosition) => monaco.languages.CompletionItem[];
    };
    HoverProvider: {
        provideHover: (model: monaco.editor.ITextModel, position: monaco.IPosition) => {
            range: monaco.Range;
            contents: (string | {
                language: string;
                value: string;
            })[];
        };
    };
};
