'use client'

import { FormEvent, useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast"

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClinet = useQueryClient()
    let toastPostID: string;

    // Create Post
    const { mutate } = useMutation(
        async (title: string) => await axios.post("/api/posts/addPost", { title }),
        {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.dismiss(toastPostID);
                    toast.error(error?.response?.data.message, {id: toastPostID})
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                toast.dismiss(toastPostID);
                toast.success("Upload Successfull 🔥", {id: toastPostID})
                queryClinet.invalidateQueries(['posts'])
                setTitle("")
                setIsDisabled(false)
            },
        }
    )
    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        toastPostID = toast.loading("Uploading Post", {id: toastPostID})
        mutate(title)
    }    

    return (
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    value={title}
                    placeholder="What's on your mind ?"
                    className="p-4 my-2 text-lg rounded-md bg-gray-100 resize-none"
                >
                </textarea>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-500" : "text-gray-500 "}`}>{`${title.length}/300`}</p>
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 py-2 px-4 rounded-md text-white disabled:opacity-25"
                    type="submit"
                >
                    Create a Post
                </button>
            </div>
        </form>
    )
}