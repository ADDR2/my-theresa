
import { fireEvent } from '@testing-library/react';
import { render, waitFor, screen, cleanup } from '../../../test-utils';
import WishListHandler from '../../services/WishListHandler';
import AnimeDetails from './AnimeDetails';

afterEach(cleanup);
afterAll(() => jest.clearAllMocks());

const mockedAnimeDetails = { lastAnimeDetails: {
    id: 345,
    episodes: 56,
    genres: [ 'weird', 'funny', 'programming' ],
    title: { english: 'Wow Anime' }
}};

describe('AnimeDetails Tests', () => {
    test('renders details stored in context', async () => {
        render(
            <AnimeDetails />,
            mockedAnimeDetails
        );
    
        await waitFor(() => screen.getByRole('anime-details-container'));
        const animeDetailsContainer = screen.getByRole('anime-details-container');
        const genreContainers = screen.getAllByRole('genre');
    
        expect(animeDetailsContainer).toBeInTheDocument();
        expect(animeDetailsContainer).toHaveClass('anime-details-container');
        expect(genreContainers.length).toEqual(mockedAnimeDetails.lastAnimeDetails.genres.length);
    });

    test('renders outlined icon when is not in wishlist', async () => {
        render(
            <AnimeDetails />,
            mockedAnimeDetails
        );
    
        await waitFor(() => screen.getByRole('anime-details-container'));
        const outlinedStar = screen.getByRole('outlined-star');
    
        expect(outlinedStar).toBeInTheDocument();
    });

    test('renders outlined icon when is not in wishlist', async () => {
        WishListHandler.addToWishList(
            'anime',
            {
                name: mockedAnimeDetails.lastAnimeDetails.title.english,
                id: mockedAnimeDetails.lastAnimeDetails.id
            }
        );

        render(
            <AnimeDetails />,
            mockedAnimeDetails
        );
    
        await waitFor(() => screen.getByRole('anime-details-container'));
        const filledStar = screen.getByRole('filled-star');
    
        expect(filledStar).toBeInTheDocument();

        WishListHandler.removeFromWishList('anime', mockedAnimeDetails.lastAnimeDetails.id);
    });

    test('adds to wishlist when clicking on outlined star', async () => {
        render(
            <AnimeDetails />,
            mockedAnimeDetails
        );
    
        await waitFor(() => screen.getByRole('anime-details-container'));

        fireEvent.click(screen.getByRole('outlined-star'));
    
        expect(WishListHandler.isInWishList('anime', mockedAnimeDetails.lastAnimeDetails.id)).toEqual(true);
        
        WishListHandler.removeFromWishList('anime', mockedAnimeDetails.lastAnimeDetails.id);
    });

    test('removes from wishlist when clicking on filled star', async () => {
        WishListHandler.addToWishList(
            'anime',
            {
                name: mockedAnimeDetails.lastAnimeDetails.title.english,
                id: mockedAnimeDetails.lastAnimeDetails.id
            }
        );

        render(
            <AnimeDetails />,
            mockedAnimeDetails
        );
    
        await waitFor(() => screen.getByRole('anime-details-container'));

        fireEvent.click(screen.getByRole('filled-star'));
    
        expect(WishListHandler.isInWishList('anime', mockedAnimeDetails.lastAnimeDetails.id)).toEqual(false);
    });
});
