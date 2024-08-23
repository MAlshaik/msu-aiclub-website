import { Suspense } from 'react';
import { getPostsWithUserInfo } from '~/server/db/queries/posts';
import PostList from './postList';
import CreatePostButton from './createPostButton';
import { createClient } from '~/utils/supabase/server';
import { isAdmin } from '~/server/actions/auth';

export default async function PostsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const posts = await getPostsWithUserInfo(50);
  
  const isUserAdmin = await isAdmin();

  return (
    <div className="max-w-[1024px] mx-auto px-4 py-8 pt-28">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        {isUserAdmin && <CreatePostButton />}
      </div>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostList posts={posts} isAdmin={isUserAdmin} />
      </Suspense>
    </div>
  );
}
