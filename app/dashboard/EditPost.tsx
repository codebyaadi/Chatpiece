'use client'

import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-hot-toast"

type EditProps = {
    id: string
    avatar: string
    name: string
    title: string
    comment?: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function EditPost({avatar, name, title, comment, id}: EditProps) {

    // Toggle
    const [toggle, setToggle] = useState(false)
    let deleteToastID: string
    const queryClient = useQueryClient()

    // Delete Post
    const { mutate } = useMutation(
        async (id: string) => await axios.post("/api/posts/deletePost", {id}),
        {
            onError: (error) => {
                toast.dismiss(deleteToastID)
                console.log(error)
                toast.error("Error deleting the post", {id: deleteToastID})
            },
            onSuccess: (data) => {
                toast.dismiss(deleteToastID)
                console.log(data)
                toast.success("Post Deleted", {id: deleteToastID})
                queryClient.invalidateQueries(["auth-post"])
            },
        }
    )

    const deletePost = () => {
        deleteToastID = toast.loading("Deleting", {id: deleteToastID})
        mutate(id)
    }
    return (
        <>
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image
                    className="rounded-full"
                    width={28}
                    height={28}
                    src={avatar}
                    alt="avatar"
                />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{title}</p>
            </div>
            <div className="flex gap-4 cursor-pointer items-center">
                    <p className="text-sm font-bold text-gray-700">{comment?.length} Comments</p>
                <button onClick={(e) => {setToggle(true)}} className="text-sm font-bold text-red-500">Delete</button>
            </div>
        </div>
        {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
        </>
    )
}