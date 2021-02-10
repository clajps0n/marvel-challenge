import { Comic } from "./comic.model";

export interface Character {
    id: number,
    name: string,
    description: string,
    image: string,
    comics: Comic[]
}