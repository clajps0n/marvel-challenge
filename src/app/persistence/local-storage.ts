import { Comic } from "../models/comic.model";

export const  addToFavourites = (favourites: Comic[], newComic: Comic) => {
    if(favourites.length < 5){
        if(!favourites.map(e => e.id).includes(newComic.id)){
            favourites = favourites.concat(newComic)
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }
    }
    return favourites
}

export const  removeFromFavourites = (favourites: Comic[], comicId: number) => {
    if(favourites.length > 0){
        favourites = favourites.filter(e => e.id != comicId)
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }
    return favourites
}
