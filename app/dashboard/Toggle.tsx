'use client'

type ToggleProps = {
    deletePost: () => void
    setToggle: (toggle: boolean) => void
}

export default function Toggle({deletePost, setToggle}: ToggleProps) {
    return (
        <div className="fixed bg-black/60 w-full h-full z-20 left-0 top-0">
            <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
                <h1 className="text-xl font-bold">
                Are you sure you want to delete this post?
                </h1>
                <h3 className="text-red-500 text-sm font-semibold">
                This action cannot be undone and any associated data will also be permanently removed. Please confirm if you wish to proceed. 😢
                </h3>
                <div className="flex justify-center gap-2 mt-6">
                <button onClick={deletePost} className="bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete
                </button>
                <button onClick={(e) => setToggle(false)} className="text-gray-500 font-bold py-2 px-4 rounded hover:bg-gray-200">
                Cancel
                </button>
                </div>
            </div>
        </div>
    )
}