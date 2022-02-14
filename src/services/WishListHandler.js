class WishListHandler {
    constructor() {
        this.whishListCacheKey = 'whishlist';
    }

    getWishList() {
        const value = localStorage.getItem(this.whishListCacheKey);

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

        localStorage.setItem(this.whishListCacheKey, rawValue);
    }

    addToWishList(resourceType = 'media', value = {}) {
        const currentWishList = this.getWishList();
        currentWishList[value.id] = { name: value.name, type: resourceType };

        this.saveWishList(currentWishList);
    }

    removeFromWishList(id = '') {
        const currentWishList = this.getWishList();
        delete currentWishList[id];

        this.saveWishList(currentWishList);
    }

    isInWishList(id = '') {
        const currentWishList = this.getWishList();
        return id in currentWishList;
    }
}

export default new WishListHandler();
