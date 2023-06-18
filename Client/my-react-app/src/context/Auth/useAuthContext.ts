import { authContext } from "./authContext";
import { useContext } from "react";

export default function useAuthContext() {
    return useContext(authContext)
}