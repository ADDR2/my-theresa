import { gql } from '@apollo/client';

export const LOAD_ANIME_DETAILS = gql`
query getAnimeById($animeId: Int!) {
    Media(id: $animeId) {
        title {
            english
        }
        episodes
        genres
        description
        bannerImage
    }
}
`;

export const LOAD_STAFF_DETAILS = gql`
query getStaffById($staffId: Int!) {
    Staff(id: $staffId) {
        name {
            full
        }
        image {
            large
        }
        description
        age
        homeTown
    }
}
`;

export const LOAD_CHARACTER_DETAILS = gql`
query getCharacterById($characterId: Int!)  {
    Character(id: $characterId) {
        name {
            full
        }
        image {
            large
        }
        description
        age
        gender
    }
}
`;
