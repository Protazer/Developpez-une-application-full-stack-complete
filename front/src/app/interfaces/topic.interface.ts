export interface ITopic {
    id: string;
    title: string;
    content: string;
}

export interface ITopicOptions {
    label: string,
    value: string,
    disabled?: boolean
}
