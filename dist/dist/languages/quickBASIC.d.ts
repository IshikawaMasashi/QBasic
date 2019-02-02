import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import IRichLanguageConfiguration = monaco.languages.LanguageConfiguration;
export declare const QuickBASIC: {
    MonarchDefinitions: {
        defaultToken: string;
        tokenPostfix: string;
        ignoreCase: boolean;
        brackets: {
            token: string;
            open: string;
            close: string;
        }[];
        keywords: string[];
        tagwords: string[];
        symbols: RegExp;
        escapes: RegExp;
        integersuffix: RegExp;
        floatsuffix: RegExp;
        tokenizer: {
            root: ((string | RegExp)[] | {
                include: string;
            } | (RegExp | {
                token: string;
            })[] | (RegExp | {
                cases: {
                    '@tagwords': {
                        token: string;
                    };
                    '@keywords': {
                        token: string;
                    };
                    '@default': string;
                };
            })[])[];
            whitespace: (string | RegExp)[][];
            string: (string | RegExp)[][];
        };
    };
    LanguageConfiguration: IRichLanguageConfiguration;
    CompletionItemProvider: {
        provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.IPosition) => monaco.languages.CompletionItem[];
    };
    HoverProvider: {
        provideHover: (model: monaco.editor.ITextModel, position: monaco.IPosition) => any;
    };
};
