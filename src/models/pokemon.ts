export type IPokemon = {
    count: number,
    next: string | null,
    previous: string | null,
    results: { name: string, api: string }[]
}