import * as React from "react";
export default function (menuId: string): (Child: any) => {
    new (props: {}): {
        listenId: string;
        componentDidMount(): void;
        componentWillUnmount(): void;
        handleShow: (e: any) => void;
        handleHide: () => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "trigger">(state: {
            trigger: boolean;
        } | ((prevState: Readonly<{
            trigger: boolean;
        }>, props: Readonly<{}>) => {
            trigger: boolean;
        } | Pick<{
            trigger: boolean;
        }, K>) | Pick<{
            trigger: boolean;
        }, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{
            trigger: boolean;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{
            trigger: boolean;
        }>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{
            trigger: boolean;
        }>): any;
        componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{
            trigger: boolean;
        }>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{
            trigger: boolean;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{
            trigger: boolean;
        }>, nextContext: any): void;
    };
    contextType?: React.Context<any>;
};
