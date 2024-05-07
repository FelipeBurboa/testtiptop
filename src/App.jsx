import Editor from "./components/Editor";
import Output from "./components/Output";
import { getAllPosts } from "./services/api.post.services";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    await getAllPosts().then(setPosts).catch(console.error);
  };

  console.log(posts);
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-2">Test TipTap</h1>
      <div className="w-1/2 mx-auto">
        <Editor refetch={fetchPosts} />
      </div>
      <div className="w-1/2 mx-auto flex flex-col mt-2">
        {posts?.map((post) => (
          <div key={post.id} className="mb-2 border border-gray-300">
            <Output content={post.content} />
          </div>
        ))}
      </div>
      {posts?.length === 0 && <div>No hay posts</div>}
    </>
  );
}

export default App;
