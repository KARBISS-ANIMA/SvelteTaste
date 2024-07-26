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

            if (usernameOREmail == "admin") {
                if (password == "admin") {
                    redirect(302, '/dashboard')
                }
            }

        } catch (error) {
            console.error(error);
        }
    },

    } satisfies Actions