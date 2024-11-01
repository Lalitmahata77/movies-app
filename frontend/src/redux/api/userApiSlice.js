
import { USERS_URL } from "../contraints";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        login : builder.mutation({
            query : (data)=>({
                url : `${USERS_URL}/login`,
                method : "POST",
                body : data
            })
        }),
        register : builder.mutation({
            query : (data)=>({
                url : `${USERS_URL}`,
                method : "POST",
                body : data
            })
        }),
        logout : builder.mutation({
            query : ()=>({
                url : `${USERS_URL}/logout`,
                method : "POST"
            })
        }),
        profile : builder.mutation({
            query : (data)=>({
                url : `${USERS_URL}/profile`,
                method : "PUT",
                body : data
            })
        }),
        getAllusers : builder.query({
            query : ()=>({
                url : `${USERS_URL}`
            })
        })
    })
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation,useGetAllusersQuery} = userApiSlice
