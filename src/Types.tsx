export type ThemeType = {
    theme: 'light' | 'dark',
    setTheme: (theme: 'light' | 'dark') => void
}
export interface TodoTask {
    id : number,
    taskHead : string,
    task : string,
    status : 'active' | 'done'
}