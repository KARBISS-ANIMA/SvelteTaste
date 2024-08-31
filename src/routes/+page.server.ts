import {redirect, type Actions, fail} from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {zod} from "sveltekit-superforms/adapters";
import {loginFormSchema} from "./schema";
import {superValidate} from "sveltekit-superforms";
import {isAuthorized} from "../stores/storeAuth.js";
import {get} from "svelte/store";

export const load = (async () => {

    return {
        loginForm: await superValidate(zod((loginFormSchema)))
    };
}) satisfies PageServerLoad;


export const actions = {
    login: async (event) => {
        const form = await superValidate(event, zod(loginFormSchema));

        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        try {
            const usernameOREmail = form.data.usernameOREmail;
            const password = form.data.password;
            if(!get(isAuthorized)) {
                form.data.authToken = true
            }else {form.data.authToken = false}

            if (usernameOREmail == "admin") {
                if (password == "admin") {
                    console.log(get(isAuthorized))
                        isAuthorized.update((u) => u = form.data.authToken)
                    console.log(get(isAuthorized))

                    redirect(302, '/afterAuth')
                    return (form)
                }
            }

        } catch (error) {
            console.error(error);
        }
    },

    } satisfies Actions