import {writable} from 'svelte/store'
import {browser} from "$app/environment";

let defaulteValue = false;
let persistedUser = browser ? localStorage.getItem('authToken') ?? defaulteValue : defaulteValue;

export let isAuthorized = writable<boolean>(Boolean(persistedUser));

isAuthorized.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('authToken', String(value));
    }
});