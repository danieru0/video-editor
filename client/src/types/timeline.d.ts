interface item {
    type: string;
    width: number | string;
    xPosition: number;
    selector: string;
    color: string;
    time: {
        start: number,
        end: number
    } | null
    videoPosition: {
        x: number;
        y: number;
    }
}

export interface timeLine {
    name: string;
    item: item | null
}