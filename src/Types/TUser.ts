import { TRegion } from "./TRegion";

export type TUser = {
  id: number;
  pseudo: string;
  email: string;
  visited_regions: TRegion[];
  ranks: string;
  access_lvl: number;
};
