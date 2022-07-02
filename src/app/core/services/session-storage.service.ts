import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  /**
   * Sets item
   * @template T type T as generics
   * @param key key name of variables to save session storage
   * @param t type T as generics
   */
  static setItem<T>(key: string, t: T): void {
    sessionStorage.setItem(key, JSON.stringify(t));
  }

  /**
   * Gets item
   * @template T type T as generics
   * @param key key name of variables to save session storage
   * @returns variables saved in session storage
   */
  static getItem<T>(key: string): T {
    const itemJsonString = sessionStorage.getItem(key);
    if (!itemJsonString) {
      throw Error(`key ${key} not found!`);
    }
    return JSON.parse(itemJsonString) as T;
  }

  /**
   * Removes item
   * @param key key name of variables to save session storage
   */
  static removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
}
