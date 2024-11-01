import { MOVIE_URL, UPLOAD_URL } from "../contraints";
import { apiSlice } from "./apiSlice";


export const movieApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        createMovie : builder.mutation({
            query : (createdata)=>({
                url : `${MOVIE_URL}`,
                method : "POST",
                body : createdata
            })
        }),
        updateMovie : builder.mutation({
            query : ({id,updateData})=>({
                url : `${MOVIE_URL}/update-movie/${id}`,
                method : "PUT",
                body : updateData
            })
        }),
        deleteMovie : builder.mutation({
            query : (id)=>({
                url : `${MOVIE_URL}/delete-movie/${id}`,
                method : "DELETE"
            })
        }),
      
        readMovie : builder.query({
            query : (id)=>({
                url : `${MOVIE_URL}/specific-movie/${id}`
            })
        }),
        movies : builder.query({
            query : ()=>({
                url : `${MOVIE_URL}/allMovies`
            })
        }),
        getNewMovies : builder.query({
            query : ()=>({
                url : `${MOVIE_URL}/new-movies`
            })
        }),
        getTopMovies : builder.query({
            query : ()=>({
                url : `${MOVIE_URL}/top-movies`
            })
        }),
        getRandomMovies : builder.query({
            query : ()=>({
                url : `${MOVIE_URL}/random-movies`
            })
        }),
        addMovieRevies : builder.mutation({
            query : ({id,rating,comment})=>({
                url : `${MOVIE_URL}/${id}/reviews`,
                method : "POST",
                body : {id,rating,comment}
            })
        }),
        deleteComment: builder.mutation({
            query: ({ movieId, reviewId }) => ({
              url: `${MOVIE_URL}/delete-comment`,
              method: "DELETE",
              body: { movieId, reviewId },
            }),
          }),
          uploadImage: builder.mutation({
            query: (formData) => ({
              url: `${UPLOAD_URL}`,
              method: "POST",
              body: formData,
            }),
          }),
    })
})

export const {useCreateMovieMutation,useUpdateMovieMutation,useDeleteMovieMutation,useReadMovieQuery,useMoviesQuery,useGetNewMoviesQuery,useGetTopMoviesQuery,useGetRandomMoviesQuery,useAddMovieReviesMutation,useDeleteCommentMutation,useUploadImageMutation} = movieApiSlice