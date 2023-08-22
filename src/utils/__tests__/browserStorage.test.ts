import { setStorageItem, getStorageItem, removeStorageItem } from '../browserStorage';

describe('Storage Functions', () => {
  const testKey = 'testKey';
  const testValue = { foo: 'bar' };

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should set and get an item in local storage', () => {
    setStorageItem(testKey, testValue);

    const retrievedValue = getStorageItem(testKey);

    expect(retrievedValue).toEqual(testValue);
  });

  it('should set and get an item in session storage', () => {
    setStorageItem(testKey, testValue, 'session');

    const retrievedValue = getStorageItem(testKey, 'session');

    expect(retrievedValue).toEqual(testValue);
  });

  it('should return null when getting non-existent item', () => {
    const retrievedValue = getStorageItem('nonExistentKey');

    expect(retrievedValue).toBeNull();
  });

  it('should remove an item from local storage', () => {
    setStorageItem(testKey, testValue);

    removeStorageItem(testKey);

    const retrievedValue = getStorageItem(testKey);

    expect(retrievedValue).toBeNull();
  });

  it('should remove an item from session storage', () => {
    setStorageItem(testKey, testValue, 'session');

    removeStorageItem(testKey, 'session');

    const retrievedValue = getStorageItem(testKey, 'session');

    expect(retrievedValue).toBeNull();
  });
});
