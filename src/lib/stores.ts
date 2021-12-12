import { writable } from 'svelte/store';
import type { LoginStore } from './structures';

export const login = writable<LoginStore>({
    loggedIn: false
});
