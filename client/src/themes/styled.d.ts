import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        primary: string;
        secondary: string;
        white: string;
        notSelected: string;
        inputRangeActive: string;
        inputRangeTrack: string;
        inputRangeThumb: string;
        Lato: string;
        time: string;
    }
}