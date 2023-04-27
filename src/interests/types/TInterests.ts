import { TRegion } from '../../Types/TRegion';
import { TUser } from '../../Types/TUser';
import { TCategories } from './TCategories';

export type TInterests = {
    id: number;
    name: string;
    adress: string;
    latitude: number;
    longitude: number;
    category: Partial<TCategories>;
    region: TRegion;
    user: TUser;
};
