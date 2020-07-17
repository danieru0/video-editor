interface item {
    type: string;
    width: number;
    xPosition: number;
    time: string;
    videoPosition: {
        x: number;
        y: number;
    }
}

export interface timeLine {
    name: string;
    item: item | null
}