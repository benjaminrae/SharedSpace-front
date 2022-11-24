/* eslint-disable @typescript-eslint/consistent-type-assertions */

const mockLocalStorage = (() => {
  let store = {} as Storage;

  return {
    getItem(key: string) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    removeItem(key: string) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete store[key];
    },

    clear() {
      store = {} as Storage;
    },
  };
})();

export default mockLocalStorage;
