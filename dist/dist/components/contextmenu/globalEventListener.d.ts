declare class GlobalEventListener {
    callbacks: {
        [index: string]: any;
    };
    constructor();
    handleShowEvent: (event: any) => void;
    handleHideEvent: (event: any) => void;
    register: (showCallback: any, hideCallback: any) => string;
    unregister: (id: string) => void;
}
declare const _default: GlobalEventListener;
export default _default;
