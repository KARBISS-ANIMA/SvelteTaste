<script>
import {user} from "../store.js";
import {onDestroy} from "svelte";

let user_value
user.subscribe((u) => (user_value = u))
let unsubscribe = user.subscribe((u) => (user_value = u))


function handleLogout() {
    user.update((u) => (u = ''))
}

$: console.log(user_value)

onDestroy(unsubscribe)

</script>
{#if $user_value}
    <slot></slot><script>import "../app.css";</script>
    {:else}
    <p class="text-error">
        You must be signed in to view this page.
        <a class="btn btn-primary" href="/index.layout">Sign in</a>
    </p>
    {/if}