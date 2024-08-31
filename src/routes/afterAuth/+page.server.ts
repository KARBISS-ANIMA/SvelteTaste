import {redirect} from "@sveltejs/kit";
import {isAuthorized} from "../../stores/storeAuth.js";
import type {PageServerLoad} from "../../../.svelte-kit/types/src/routes/$types.js";
import {get} from "svelte/store";

export const load = (async () => {
    console.log("server after auth =>"+get(isAuthorized))
    if (!isAuthorized){
        throw redirect(302, '/')
    }

})