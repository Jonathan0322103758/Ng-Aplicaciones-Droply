
export interface Notification {
    _id: number;
    messageId: number;
    status: boolean;
    state: boolean;
    date: string;
    description: string;
    concept: string;
}

export interface Notifications {
    _id: number;
    type: string;
    notifications: Notification[];
    quantity: number;
}