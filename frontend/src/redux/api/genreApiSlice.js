import { GENRE_URL } from "../contraints";
import { apiSlice } from "./apiSlice";

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        createGenre : builder.mutation({
            query : (newGenre)=>({
                url : `${GENRE_URL}`,
            method : "POST",
            body :  newGenre
            })
        }),
        updateGenre : builder.mutation({
            query : ({id,updateGenre})=>({
                url : `${GENRE_URL}/${id}`,
                method : "PUT",
                body : updateGenre
            })
        }),
        deletGenre : builder.mutation({
            query : (id)=>({
                url : `${GENRE_URL}/${id}`,
                method : "DELETE"
            })
        }),
        listGenres : builder.query({
            query : ()=>({
                url : `${GENRE_URL}/genres`
            })
        })
    })
})

export const {useCreateGenreMutation,useDeletGenreMutation,useUpdateGenreMutation,useListGenresQuery} = genreApiSlice