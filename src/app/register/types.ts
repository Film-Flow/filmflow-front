import * as z from "zod";
import { schema } from "./schema";

export type RegisterForm = z.infer<typeof schema>;