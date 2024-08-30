<script lang="ts">

    import {Button} from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import {Input} from "$lib/components/ui/input/index.js";
    import {Label} from "$lib/components/ui/label/index.js";
    import {superForm} from "sveltekit-superforms";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {loginFormSchema} from "./schema.js";
    import * as Form from "$lib/components/ui/form";
    import type {PageData} from './$types';
    import {isAuthorized} from "../stores/storeAuth.js";

    export let data: PageData;

    const loginForm = superForm(data.loginForm, {
        validators: zodClient(loginFormSchema),
    });

    const {form: loginFormData, enhance, submitting} = loginForm;

    $: Auth = $isAuthorized

    console.log("page log isAuthorized ->" + $isAuthorized)

</script>

{#if Auth===true}
    Авторизован
    {:else if Auth===false}
    Не авторизован
    {/if}

<div class="container flex mx-auto w-screen h-screen items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title text-center w-full block">{Auth}</h2>
            <form class="grid gap-y-2 grid-cols-1 my-4" id="login" method="POST" use:enhance action="?/login">
                <Card.Root class="w-full max-w-sm">
                    <Card.Header>
                        <Card.Title class="text-2xl">Login</Card.Title>
                        <Card.Description>Enter your email below to login to your account.</Card.Description>
                    </Card.Header>
                    <Card.Content class="grid gap-4">
                        <div class="grid gap-2">
                            <Form.Field form={loginForm} name="usernameOREmail">
                                <Form.Control let:attrs>
                                    <Form.Label>Email</Form.Label>
                                    <Input {...attrs} bind:value={$loginFormData.usernameOREmail}
                                           placeholder="your@email.com"/>
                                </Form.Control>
                                <Form.FieldErrors/>
                            </Form.Field>
                        </div>
                        <div class="grid gap-2">
                            <Form.Field form={loginForm} name="password">
                                <Form.Control let:attrs>
                                    <Form.Label>Password</Form.Label>
                                    <Input {...attrs} bind:value={$loginFormData.password}
                                           type="password" placeholder="••••••••" />
                                </Form.Control>
                                <Form.FieldErrors/>
                            </Form.Field>
                        </div>
                    </Card.Content>
                    <Card.Footer>
                        <Form.Button class="w-full" form="login" disabled={$submitting}>
                            {#if $submitting}
                                <span class="loading loading-spinner loading-xs"></span>
                            {/if}
                            Sign in
                        </Form.Button>
                    </Card.Footer>
                </Card.Root>
            </form>
        </div>
    </div>
</div>