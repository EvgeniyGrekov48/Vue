export default interface Note {
    id?: number,
    name: string,
    comment: string,
    createdAt?: string,
    updatedAt?: string
}

export function emptyNote(): Note {
    return {
        name: '',
        comment: '',
    } as Note
}
