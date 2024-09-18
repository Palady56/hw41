import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DataFetchComponent() {
  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  //refetch
  const [id, setId] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        setData(response.data);
      } catch (error) {
        setError("Ошибка загрузки данных")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Received data:</h1>
      {Array.isArray(data) ? (
        <ul>
          {data.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <div>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </div>
      )}
      <button onClick={() => setId(prevId => prevId + 1)}>Load next post</button>
    </div>
  );
}
