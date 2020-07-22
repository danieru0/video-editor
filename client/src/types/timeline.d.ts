interface item {
    type: string;
    itemType: string;
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
    textOptions: {
        textAlign: string;
        fontSize: string;
        justifyContent: string;
        fontFamily: string;
        text: string;
        textColor: string;
    } | null;
}

export interface timeLine {
    name: string;
    item: item | null
}