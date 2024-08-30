import { writable } from 'svelte/store'
import {browser} from "$app/environment";

let persistedUser = browser && localStorage.getItem('user')

export let isAuthorized = writable(persistedUser ? JSON.parse(persistedUser) : '')

if (browser) {
    isAuthorized.subscribe(u => localStorage.user = u)
}