import WishListHandler from './WishListHandler';

const testScopes = {
    WishListHandler: {},
    getWishList: {},
    saveWishList: {},
    addToWishList: {},
    removeFromWishList: {},
    isInWishList: {},
};

describe('WishListHandler tests', () => {
    afterEach(() => {
        delete WishListHandler.someNewProperty;
    });

    it('should return always the same instance', () => {
        const firstImport = require('./WishListHandler');
        const secondImport = require('./WishListHandler');
        const mockedValue = 34;

        firstImport.someNewProperty = mockedValue;

        expect(secondImport.someNewProperty).toEqual(mockedValue);
    });

    describe('getWishList tests', () => {
        beforeAll(() => {
            testScopes.getWishList.prevGetItem = Object.getPrototypeOf(localStorage).getItem;
        });

        afterEach(() => {
            localStorage.getItem.mockClear();
            Object.getPrototypeOf(localStorage).getItem = testScopes.getWishList.prevGetItem;
        });

        afterAll(() => jest.clearAllMocks());

        it('should return parsed value from localStorage', () => {
            const expectedValue = {
                345: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };
            Object.getPrototypeOf(localStorage).getItem = jest.fn(() => JSON.stringify(expectedValue));

            const result = WishListHandler.getWishList();

            expect(result).toEqual(expectedValue);
            expect(localStorage.getItem).toHaveBeenCalledTimes(1);
            expect(localStorage.getItem).toHaveBeenCalledWith(WishListHandler.wishListCacheKey);
        });

        function testFalsyValues() {
            const values = [null, 0];

            for (const value of values) {
                it(`should return empty object when JSON.parse returns ${value}`, () => {
                    const expectedValue = {};
                    Object.getPrototypeOf(localStorage).getItem = jest.fn(() => value);

                    const result = WishListHandler.getWishList();

                    expect(result).toEqual(expectedValue);
                    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
                });
            }
        }

        testFalsyValues();

        it('should return what getItem returns when JSON.parse throws', () => {
            const expectedValue = 'Something that cannot be parsed';
            Object.getPrototypeOf(localStorage).getItem = jest.fn(() => expectedValue);

            const result = WishListHandler.getWishList();

            expect(result).toEqual(expectedValue);
            expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        });

        it('should return empty object when JSON.parse throws and value is falsy', () => {
            const expectedValue = {};
            Object.getPrototypeOf(localStorage).getItem = jest.fn(() => '');

            const result = WishListHandler.getWishList();

            expect(result).toEqual(expectedValue);
            expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        });
    });

    describe('saveWishList tests', () => {
        beforeAll(() => {
            testScopes.getWishList.prevSetItem = Object.getPrototypeOf(localStorage).setItem;
        });

        afterEach(() => {
            localStorage.setItem.mockClear();
            Object.getPrototypeOf(localStorage).setItem = testScopes.getWishList.prevSetItem;
        });

        afterAll(() => jest.clearAllMocks());

        it('should call setItem with the stringified value', () => {
            const argument = {
                345: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };
            const expectedValue = JSON.stringify(argument);
            Object.getPrototypeOf(localStorage).setItem = jest.fn();

            WishListHandler.saveWishList(argument);

            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith(WishListHandler.wishListCacheKey, expectedValue);
        });

        it('should call setItem with empty value when JSON.stringify throws ("cyclic object value")', () => {
            const circularReference = { b: 56 };
            circularReference.c = circularReference;

            const argument = { type: circularReference };
            Object.getPrototypeOf(localStorage).setItem = jest.fn();

            WishListHandler.saveWishList(argument);

            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith(WishListHandler.wishListCacheKey, '{}');
        });

        it(
            'should call setItem with empty value when JSON.stringify throws ("BigInt value can\'t be serialized in JSON")',
            () => {
                const argument = { type: 34n };
                Object.getPrototypeOf(localStorage).setItem = jest.fn();

                WishListHandler.saveWishList(argument);

                expect(localStorage.setItem).toHaveBeenCalledTimes(1);
                expect(localStorage.setItem).toHaveBeenCalledWith(WishListHandler.wishListCacheKey, '{}');
            },
        );
    });

    describe('addToWishList tests', () => {
        beforeAll(() => {
            testScopes.addToWishList.prevGetWishList = Object.getPrototypeOf(WishListHandler).getWishList;
            testScopes.addToWishList.prevSaveWishList = Object.getPrototypeOf(WishListHandler).saveWishList;
        });

        afterEach(() => {
            WishListHandler.getWishList.mockClear();
            WishListHandler.saveWishList.mockClear();
            Object.getPrototypeOf(WishListHandler).getWishList = testScopes.addToWishList.prevGetWishList;
            Object.getPrototypeOf(WishListHandler).saveWishList = testScopes.addToWishList.prevSaveWishList;
        });

        afterAll(() => jest.clearAllMocks());

        it('should add item and call saveWishList method with new list', () => {
            const currentList = {
                345: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };
            const newItem = { name: 'Wayne', id: 750 };
            const itemType = 'DC';
            const expectedList = {
                ...currentList,
                [`${itemType}-${newItem.id}`]: {
                    name: newItem.name,
                    type: itemType,
                    id: newItem.id,
                },
            };
            Object.getPrototypeOf(WishListHandler).getWishList = jest.fn(() => currentList);
            Object.getPrototypeOf(WishListHandler).saveWishList = jest.fn();

            WishListHandler.addToWishList(itemType, newItem);

            expect(WishListHandler.getWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.getWishList).toHaveReturnedWith(currentList);
            expect(WishListHandler.saveWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.saveWishList).toHaveBeenCalledWith(expectedList);
        });

        it('should add item with default type when not providing the type', () => {
            const currentList = {
                345: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };
            const newItem = { name: 'Wayne', id: 750 };
            const expectedList = {
                ...currentList,
                [`anime-${newItem.id}`]: {
                    name: newItem.name,
                    type: 'anime',
                    id: newItem.id,
                },
            };
            Object.getPrototypeOf(WishListHandler).getWishList = jest.fn(() => currentList);
            Object.getPrototypeOf(WishListHandler).saveWishList = jest.fn();

            WishListHandler.addToWishList(undefined, newItem);

            expect(WishListHandler.getWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.getWishList).toHaveReturnedWith(currentList);
            expect(WishListHandler.saveWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.saveWishList).toHaveBeenCalledWith(expectedList);
        });

        it('should add item with undefined value and id when no item is provided', () => {
            const currentList = {
                345: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };
            const expectedItemKey = 'anime-undefined';
            const expectedList = {
                ...currentList,
                [expectedItemKey]: {
                    name: undefined,
                    type: 'anime',
                    id: undefined,
                },
            };
            Object.getPrototypeOf(WishListHandler).getWishList = jest.fn(() => currentList);
            Object.getPrototypeOf(WishListHandler).saveWishList = jest.fn();

            WishListHandler.addToWishList();

            expect(WishListHandler.getWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.getWishList).toHaveReturnedWith(currentList);
            expect(WishListHandler.saveWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.saveWishList).toHaveBeenCalledWith(expectedList);
        });
    });

    describe('removeFromWishList tests', () => {
        beforeAll(() => {
            testScopes.removeFromWishList.prevGetWishList = Object.getPrototypeOf(WishListHandler).getWishList;
            testScopes.removeFromWishList.prevSaveWishList = Object.getPrototypeOf(WishListHandler).saveWishList;
        });

        afterEach(() => {
            WishListHandler.getWishList.mockClear();
            WishListHandler.saveWishList.mockClear();
            Object.getPrototypeOf(WishListHandler).getWishList = testScopes.removeFromWishList.prevGetWishList;
            Object.getPrototypeOf(WishListHandler).saveWishList = testScopes.removeFromWishList.prevSaveWishList;
        });

        afterAll(() => jest.clearAllMocks());

        it('should remove the item and call saveWishList method with new list', () => {
            const itemId = 345;
            const itemType = 'New 52';
            const itemIdToRemove = `${itemType}-${itemId}`;
            const currentList = {
                [itemIdToRemove]: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };
            const expectedList = { ...currentList };
            delete expectedList[itemIdToRemove];

            Object.getPrototypeOf(WishListHandler).getWishList = jest.fn(() => currentList);
            Object.getPrototypeOf(WishListHandler).saveWishList = jest.fn();

            WishListHandler.removeFromWishList(itemType, itemId);

            expect(WishListHandler.getWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.getWishList).toHaveReturnedWith(currentList);
            expect(WishListHandler.saveWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.saveWishList).toHaveBeenCalledWith(expectedList);
        });

        it('should try to remove item with default type when not providing the type', () => {
            const itemId = 345;
            const itemType = 'anime';
            const itemIdToRemove = `${itemType}-${itemId}`;
            const currentList = {
                [itemIdToRemove]: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };
            const expectedList = { ...currentList };
            delete expectedList[itemIdToRemove];

            Object.getPrototypeOf(WishListHandler).getWishList = jest.fn(() => currentList);
            Object.getPrototypeOf(WishListHandler).saveWishList = jest.fn();

            WishListHandler.removeFromWishList(undefined, itemId);

            expect(WishListHandler.getWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.getWishList).toHaveReturnedWith(currentList);
            expect(WishListHandler.saveWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.saveWishList).toHaveBeenCalledWith(expectedList);
        });

        it('should not modify the list when item is not found', () => {
            const currentList = {
                345: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };

            Object.getPrototypeOf(WishListHandler).getWishList = jest.fn(() => currentList);
            Object.getPrototypeOf(WishListHandler).saveWishList = jest.fn();

            WishListHandler.removeFromWishList();

            expect(WishListHandler.getWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.getWishList).toHaveReturnedWith(currentList);
            expect(WishListHandler.saveWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.saveWishList).toHaveBeenCalledWith(currentList);
        });
    });

    describe('isInWishList tests', () => {
        beforeAll(() => {
            testScopes.isInWishList.prevGetWishList = Object.getPrototypeOf(WishListHandler).getWishList;
        });

        afterEach(() => {
            WishListHandler.getWishList.mockClear();
            Object.getPrototypeOf(WishListHandler).getWishList = testScopes.isInWishList.prevGetWishList;
        });

        afterAll(() => jest.clearAllMocks());

        it('should return true when item is in list', () => {
            const itemId = 345;
            const itemType = 'New 52';
            const itemParsedId = `${itemType}-${itemId}`;
            const currentList = {
                [itemParsedId]: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };

            Object.getPrototypeOf(WishListHandler).getWishList = jest.fn(() => currentList);

            const result = WishListHandler.isInWishList(itemType, itemId);

            expect(result).toEqual(true);
            expect(WishListHandler.getWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.getWishList).toHaveReturnedWith(currentList);
        });

        it('should try to find item with default type when not providing the type', () => {
            const itemId = 345;
            const itemType = 'anime';
            const itemParsedId = `${itemType}-${itemId}`;
            const currentList = {
                [itemParsedId]: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };

            Object.getPrototypeOf(WishListHandler).getWishList = jest.fn(() => currentList);

            const result = WishListHandler.isInWishList(undefined, itemId);

            expect(result).toEqual(true);
            expect(WishListHandler.getWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.getWishList).toHaveReturnedWith(currentList);
        });

        it('should return false when item is not found', () => {
            const currentList = {
                345: { id: 'Something', name: 'Really' },
                78: {
                    id: 'Not',
                    name: 'That',
                    type: 'Important',
                },
            };

            Object.getPrototypeOf(WishListHandler).getWishList = jest.fn(() => currentList);

            const result = WishListHandler.isInWishList();

            expect(result).toEqual(false);
            expect(WishListHandler.getWishList).toHaveBeenCalledTimes(1);
            expect(WishListHandler.getWishList).toHaveReturnedWith(currentList);
        });
    });
});
