import {z} from 'zod';

export const loginFormSchema = z.object({
    usernameOREmail: z.string().email().min(1),
    password: z.string().min(1)
});

export type LoginFormSchema = typeof loginFormSchema;