import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://f0665380.xsph.ru'}),
    endpoints: (build) => ({
        fetchAllMessages: build.mutation({
            query: (data) => ({
                url: '/',
                method: "POST",
                body: data
            }),
        }),
    })
});

export  const {useFetchAllMessagesMutation} = messageApi;


