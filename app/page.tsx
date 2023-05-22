'use client'

import { useQuery } from "@tanstack/react-query"
import AddPost from "./components/AddPost"
import axios from "axios"
import Posts from "./components/Posts"
import { PostsType } from "./types/Posts"


const allPosts = async () => {
  const response = await axios.get('/api/posts/getPost')
  return response.data
}

export default function Home() {
  const {data, error, isLoading}  = useQuery<PostsType[]>({
    queryFn: allPosts,
    queryKey: ["posts"]
  })

  if(error) return error
  if(isLoading) return "Loading..."
  //console.log(data)

  return (
    <main className="">
      <AddPost />
      {data?.map((post) => (
        <Posts
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comment={post.comment}
        />
      ))}
    </main>
  )
}
