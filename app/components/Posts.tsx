import Linkify from 'react-linkify';
import Image from 'next/image';
import Link from 'next/link';

type Post = {
  id: any;
  name: any;
  avatar: any;
  postTitle: any;
  comment: any;
};

export default function Posts({ id, name, avatar, postTitle, comment }: Post) {
  return (
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
        <p className="break-all">
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a href={decoratedHref} target='_blank' key={key} className="text-red-500">
                {decoratedText}
              </a>
            )}
          >
            {postTitle}
          </Linkify>
        </p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">{comment?.length} Comments</p>
        </Link>
      </div>
    </div>
  );
}
