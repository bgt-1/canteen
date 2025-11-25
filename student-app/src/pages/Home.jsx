import { useEffect, useState } from "react";
import API from "../api/apiClient";

export default function Home() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    API.get("/recommend")
      .then((res) => setTrending(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">
        Welcome to the  JIIT Canteen!
      </h1>
      <p className="text-gray-600 mb-8">
        Order your favourite snacks and meals instantly.
      </p>

      <h2 className="text-2xl font-semibold mb-4">🔥 Trending Now</h2>

      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
        {trending.map((item) => (
          <div
            key={item.id}
            className="p-4 shadow rounded border hover:scale-105 transition cursor-pointer"
          >
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-gray-700">₹{item.price}</p>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        ))}

        {trending.length === 0 && (
          <p className="text-gray-500 col-span-3">
            No trending items available.
          </p>
        )}
      </div>
    </div>
  );
}
