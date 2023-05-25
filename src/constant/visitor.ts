import { TUser } from '../Types/TUser';

export const DEFAULT_USER: TUser = {
    id: -1,
    pseudo: '',
    email: '',
    visited_regions: [],
    ranks: { id: -1, name: '' },
    access_lvl: 0,
};
