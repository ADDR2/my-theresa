class WishListHandler {
    constructor() {
        this.wishListCacheKey = 'wishlist';
    }

    getWishList() {
        const value = localStorage.getItem(this.wishListCacheKey);

        try {
            return JSON.parse(value) || {};
        } catch (error) {
            console.warn(error);
            return value || {};
        }
    }

    saveWishList(value = {}) {
        let rawValue = '{}';

        try {
            rawValue = JSON.stringify(value);
        } catch (error) {
            console.warn(error);
        }

        localStorage.setItem(this.wishListCacheKey, rawValue);
    }

    addToWishList(resourceType = 'anime', value = {}) {
        const currentWishList = this.getWishList();
        currentWishList[`${resourceType}-${value.id}`] = {
            name: value.name,
            type: resourceType,
            id: value.id,
        };

        this.saveWishList(currentWishList);
    }

    removeFromWishList(resourceType = 'anime', id = '') {
        const currentWishList = this.getWishList();
        delete currentWishList[`${resourceType}-${id}`];

        this.saveWishList(currentWishList);
    }

    isInWishList(resourceType = 'anime', id = '') {
        const currentWishList = this.getWishList();
        return `${resourceType}-${id}` in currentWishList;
    }
}

export default new WishListHandler();
