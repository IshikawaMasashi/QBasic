import * as React from 'react';
import Console from '../browser/components/console/react-console';
interface EchoConsoleProps {
    output: string;
    setOutput: (output: string) => void;
}
interface EchoConsoleState {
    count: number;
}
export declare class EchoConsole extends React.Component<EchoConsoleProps, EchoConsoleState> {
    constructor(props: EchoConsoleProps);
    child: {
        console?: Console;
    };
    echo: (text: string) => void;
    promptLabel: () => string;
    componentDidUpdate(prevProps: EchoConsoleProps, prevState: EchoConsoleState): void;
    render(): JSX.Element;
}
export {};
