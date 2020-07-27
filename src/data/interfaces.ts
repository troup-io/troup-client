import { Location } from 'history';

export type StatefulLocation = Location<{
    from?: string;
}>;
