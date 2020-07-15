export interface videoDimensions {
    width: number;
    height: number;
}

export interface videoRef {
    videoRef: any;
    currentDuration: number;
}

export interface videoData extends videoDimensions {
    play: boolean;
    volume: number;
    duration: number;
    muted: boolean;
}