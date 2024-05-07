const createPost = async (body) => {
  console.log(body);
  const response = await fetch(`http://localhost:3000/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const getPost = async (id) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const getAllPosts = async () => {
  const response = await fetch(`http://localhost:3000/api/posts`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const updatePost = async (id, newData) => {
  console.log(uid);
  console.log(newData);
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const deletePost = async (id) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

export { createPost, getPost, getAllPosts, updatePost, deletePost };
