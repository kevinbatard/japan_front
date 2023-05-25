import { TRank } from '../profil/components/TRank';
import { TRegion } from './TRegion';

export type TUser = {
    id: number;
    pseudo: string;
    email: string;
    visited_regions: TRegion[];
    ranks: TRank;
    access_lvl: number;
};
