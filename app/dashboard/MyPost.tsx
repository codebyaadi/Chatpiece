'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {AuthPosts} from "../types/AuthPosts"
import EditPost from "./EditPost"

const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPost')
    return response.data
}

export default function MyPost(): JSX.Element {
    const {data, isLoading} =useQuery<AuthPosts>({
        queryFn: fetchAuthPosts,
        queryKey: ['auth-post']
    })
    if(isLoading) return <h1>Post are loading...</h1>
    console.log(data)
    return (
        <div>
            {data?.post?.map((post) => (
                <EditPost
                    key={post.id}
                    id={post.id}
                    name={data.name}
                    avatar={data.image}
                    title={post.title}
                    comment={post.comment}
                />
            ))}
        </div>
    )
}