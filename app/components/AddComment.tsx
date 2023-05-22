'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { data } from "autoprefixer"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

type CommentProps = {
    id?: string
}

type Comment = {
    postId?: string
    title: string
}

export default function AddComment({id} : CommentProps) {
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let toastCommentID: string;

    const {mutate} = useMutation(
        async (data: Comment) => await axios.post('/api/posts/addComment', {data}),
        {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.dismiss(toastCommentID);
                    toast.error(error?.response?.data.message, {id: toastCommentID})
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                setTitle("")
                setIsDisabled(false)
                queryClient.invalidateQueries(['detail-post'])
                toast.dismiss(toastCommentID);
                toast.success("Comment Added Successfull 🔥", {id: toastCommentID})
            },
        }
    )

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        toastCommentID = toast.loading("Adding Comment", {id: toastCommentID})
        mutate({title, postId: id})
    }

    return (
        <form onSubmit={submitComment} className="my-8">
            <h3>Add a comment</h3>
            <div className="flex flex-col my-2">
                <input
                    onChange={(e) => setTitle(e.target.value)} 
                    type="text"
                    value={title}
                    name="title"
                    className="p-4 text-lg rounded-md my-2"
                />
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-500" : "text-gray-500 "}`}>{`${title.length}/300`}</p>
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 py-2 px-4 rounded-md text-white disabled:opacity-25"
                    type="submit"
                >
                    Add a Comment
                </button>
            </div>
        </form>
    )
}