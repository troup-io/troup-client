/// <reference types="react-scripts" />

declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'staging' | 'production';
        REACT_APP_ENDPOINT: string;
    }
}
