import { createContext } from "react";
import { AuthContextValue } from "../../models";

export const authContext = createContext<AuthContextValue | null>(null)