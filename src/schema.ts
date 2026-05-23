import { z } from 'zod'

export const schema = z.object({
    firstName: z.string().min(2,'Длина не менее двух символов'),
    lastName: z.string().min(2,'Длина не менее двух символов'),
    email: z.string().email('Некорректная почта'),
    password: z.string().min(4,'Длина не менее четырех символов').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9]).+$/,'Пароль должен содержать заглавную, строчные буквы и цифру'),
    confirmPassword: z.string().min(4,'Длина не менее четырех символов'),
    roles: z.enum(['Студент','Лектор','Ментор'],'Выберите роль'),
    agreement: z.boolean().refine(v => v === true, 'Примите условия')
}).refine(
    data => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path:['confirmPassword']
    }
)
export type FormData = z.infer<typeof schema>