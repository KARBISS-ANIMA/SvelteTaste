import {redirect, type Actions, fail} from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {zod} from "sveltekit-superforms/adapters";
import {loginFormSchema} from "./schema";
import {superValidate} from "sveltekit-superforms";

export const load = (async () => {
    return {
        loginForm: await superValidate(zod((loginFormSchema)))
    };
}) satisfies PageServerLoad;


export const actions = {

} satisfies Actions