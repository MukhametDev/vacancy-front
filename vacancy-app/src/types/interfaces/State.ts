import {VacancyInterface} from "./Vacancy.ts";

export interface RootState {
    vacancies: VacancyState;
    auth: AuthState;
}
export interface AuthState {
    isAdmin: boolean;
    token: string | null
}

interface VacancyState {
    items: VacancyInterface[];
    loading: boolean;
}