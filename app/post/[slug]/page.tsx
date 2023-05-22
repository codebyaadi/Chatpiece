'use client'

import AddComment from "@/app/components/AddComment"
import Posts from "@/app/components/Posts"
import { PostType } from "@/app/types/Post"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"

type URL = {
    params: {
        slug: string
    }
}

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function PostDetail(url: URL) {
    const {data, isLoading} = useQuery<PostType>({
        queryKey: ['detail-post'],
        queryFn: () => fetchDetails(url.params.slug)
    })
    if(isLoading) return "Loading..."
    console.log(data)
    return (
        <div>
            <Posts
                id={data?.id || ""}
                name={data?.user.name || ""}
                avatar={data?.user.image || ""}
                postTitle={data?.title || ""}
                comment={data?.comment}
            />
            <AddComment id={data?.id} />
            {data?.comment.map((comment) => (
                <div key={comment.id} className="bg-white my-8 p-8 rounded-lg">
                <div className="flex items-center gap-2">
                    <Image
                        className="rounded-full"
                        width={28}
                        height={28}
                        src={comment.user?.image}
                        alt="avatar"
                    />
                    <h3 className="font-bold text-gray-700">{comment.user.name}</h3>
                    <h2 className="text-sm">{comment.createdAt}</h2>
                </div>
                <div className="my-8">
                    <p className="break-all">{comment.message}</p>
                </div>
                <div className="flex gap-4 cursor-pointer items-center">
                </div>
            </div>
            ))}
        </div>
    )
}