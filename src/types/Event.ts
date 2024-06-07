enum EventType {
    ADD_FILM = "add_film",
    DELETE_FILM = "delete_film",
    UPDATE_FILM = "update_film",
}

interface AddFilmEvent {
    type: EventType.ADD_FILM;
    film: Film;
}

interface DeleteFilmEvent {
    type: EventType.DELETE_FILM;
    filmId: string;
}

interface UpdateFilmEvent {
    type: EventType.UPDATE_FILM;
    film: Film;
}

type FilmEvent = AddFilmEvent | DeleteFilmEvent | UpdateFilmEvent;