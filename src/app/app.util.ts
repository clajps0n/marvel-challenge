import { Comic } from "./models/comic.model";

export const  addToFavourites = (favourites: Comic[], newComic: Comic) => {
    console.log(favourites)
    if(favourites.length < 5){
        if(!favourites.map(e => e.id).includes(newComic.id)){
            favourites = favourites.concat(newComic)
        }
    }
    return favourites
}

export const  removeFromFavourites = (favourites: Comic[], comicId: number) => {
    if(favourites.length > 0){
        favourites = favourites.filter(e => e.id != comicId)
    }
    return favourites
}
