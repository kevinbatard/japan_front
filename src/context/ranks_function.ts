import { BASE_URL } from '../constant/URL';
import { TRank } from '../profil/components/TRank';

import { TUser } from '../Types/TUser';

export async function fetchGetRank(i: number, setRank: (rank: TRank) => void) {
    await fetch(`${BASE_URL}/ranks/${i}`)
        .then((response) => response.json())
        .then((response) => {
            setRank(response.data);
        })
        .catch((err) => console.error(err));
}

export async function fetchUpdateRank(
    rank: TRank,
    token: string,
    onUserChange: (user: TUser) => void
) {
    await fetch(`${BASE_URL}/users/rank`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ranks: rank }),
    })
        .then((response) => response.json())
        .then((response) => {
            onUserChange(response.data);
        })
        .catch((err) => console.error(err));
}

export function newRank(
    user: TUser,
    token: string,
    onUserChange: (user: TUser) => void,
    setRank: (rank: TRank) => void,
    rank: TRank
) {
    if (user.visited_regions.length >= 0 && user.visited_regions.length <= 1) {
        if (user.visited_regions.length === 0) return;
        fetchGetRank(1, setRank);
        fetchUpdateRank(rank!, token, onUserChange);
        return alert(`Vous avez atteind le rang ${user.ranks.name}`);
    }
    if (user.visited_regions.length >= 2 && user.visited_regions.length <= 4) {
        if (user.visited_regions.length === 3) return;
        fetchGetRank(2, setRank);
        fetchUpdateRank(rank!, token, onUserChange);
        return alert(`Vous avez atteind le rang ${user.ranks.name}`);
    }
    if (user.visited_regions.length >= 5 && user.visited_regions.length <= 7) {
        if (user.visited_regions.length === 6) return;
        fetchGetRank(3, setRank);
        fetchUpdateRank(rank!, token, onUserChange);
        return alert(`Vous avez atteind le rang ${user.ranks.name}`);
    }
    if (user.visited_regions.length === 8) {
        fetchGetRank(4, setRank);
        fetchUpdateRank(rank!, token, onUserChange);
        return alert(`Vous avez atteind le rang ${user.ranks.name}`);
    }
}
