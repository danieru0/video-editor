export interface videoDimensions {
    width: number;
    height: number;
}

export interface videoRef {
    videoRef: HTMLVideoElement;
    currentDuration: number;
}

export interface videoData extends videoDimensions {
    play: boolean;
    volume: number;
    duration: number;
    videoLength: number;
    muted: boolean;
}