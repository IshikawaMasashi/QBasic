import * as React from 'react';
interface SortableItemProps {
    className?: string;
}
export declare class SortableItem extends React.Component<SortableItemProps> {
    render(): JSX.Element;
}
interface ListProps {
    horizontal?: boolean;
    children: JSX.Element[];
    className?: string;
    itemClassName?: string;
    onItemMove: (oldIndex: number, newIndex: number) => void;
}
interface ListState {
    draggingPropIndex: number | null;
    childrenOrder: number[];
}
export declare class SortableList extends React.Component<ListProps, ListState> {
    constructor(props: ListProps);
    componentWillMount(): void;
    render(): JSX.Element;
    componentWillReceiveProps(newProps: ListProps): void;
    private getOrderedChildren;
    private renderChild;
    private onDragNear;
    private onDragStart;
    private onDragEnd;
    private setUpState;
}
export {};
