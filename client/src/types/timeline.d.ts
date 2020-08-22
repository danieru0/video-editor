export interface item {
    type: string;
    itemType: string;
    width: number | string;
    xPosition: number;
    selector: string;
    color: string;
    opacity: number;
    keepRatio: boolean;
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
        textPosition: {
            x: number;
            y: number;
        } | null;
    } | null;
    imageSrc: string | null;
}

export interface timeLine {
    name: string;
    item: item | null
}