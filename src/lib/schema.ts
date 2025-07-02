import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上で入力してください" }),
});

export const registerSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  period: z
    .string()
    .min(1, "受講期は必須です")
    .refine((val) => !isNaN(Number(val)), "数字を入力してください"),
  password: z.string().min(1, "パスワードは必須です"),
});
