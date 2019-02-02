import * as React from 'react';
interface ConsoleMessageProps {
    type?: string;
    value: any[];
}
interface ConsoleMessageState {
}
export default class ConsoleMessage extends React.Component<ConsoleMessageProps, ConsoleMessageState> {
    static defaultProps: {
        type: string;
        value: any[];
    };
    constructor(props: ConsoleMessageProps);
    render(): JSX.Element;
}
export {};
