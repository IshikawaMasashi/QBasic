import * as React from 'react';
interface ConsolePromptProps {
    point?: number;
    value: string;
    label: string;
    argument?: string;
}
interface ConsolePromptState {
}
export default class ConsolePrompt extends React.Component<ConsolePromptProps, ConsolePromptState> {
    static defaultProps: ConsolePromptProps;
    child: {
        cursor?: Element;
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    updateSemaphore: number;
    idle(): void;
    renderValue(): (string | JSX.Element)[];
    render(): JSX.Element;
}
export {};
