import { gql } from '@apollo/client';

export const LOAD_ANIME_IMAGES = gql`
query getAnimes {
    Page {
        media {
            id
            bannerImage
        }
    }
}
`;

export const LOAD_STAFF_IMAGES = gql`
query getStaff {
    Page {
        staff {
            id
            image {
                large
            }
        }
    }
}
`;

export const LOAD_CHARACTER_IMAGES = gql`
query getCharacters {
    Page {
        characters {
            id
            image {
                large
            }
        }
    }
}
`;

export const queriesToLoadHome = [
    LOAD_ANIME_IMAGES,
    LOAD_STAFF_IMAGES,
    LOAD_CHARACTER_IMAGES,
];
