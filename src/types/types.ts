
export enum TypesAttach {
    Image = "image",
    Video = 'video'
}

export interface IAtachment {
    type: TypesAttach;
    url: string;
}

export interface IPropsMessage {
    message: {
        author: string;
        content: string;
        attachments?: IAtachment[];
        date: string;
        id: string;
        channel: string;
        region: string;
        senderNumber: string;
    }
}