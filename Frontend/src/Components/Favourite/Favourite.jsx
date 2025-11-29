import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Phone, MessageCircle, ArrowLeft } from 'lucide-react';

export default function FavouritePage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchFavorites = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:3000/api/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const removeFromFav = async (productId) => {
    await fetch('http://localhost:3000/api/favorites/toggle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });
    setFavorites(prev => prev.filter(item => item.productId !== productId));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F6F3" }} dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        <div className="flex items-center gap-4 mb-8">
          <ArrowLeft className="w-8 h-8 text-gray-600" />
          <h2 className="text-3xl font-bold text-gray-800">Favourites</h2>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl" style={{ color: "#000000BF" }}>No favorites yet.</p>
          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {favorites.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative"
              >

                <div className="relative">
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.productName}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => removeFromFav(item.productId)}
                    className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-sm"
                  >
                    <Heart className="w-6 h-6 text-green-700 stroke-[2.5]" />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {item.productName}
                  </h3>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-teal-600">
                      {item.price} EGP
                    </span>

                    <div className="flex gap-3">
                      <button className="bg-green-600 px-4 py-2 rounded-xl hover:bg-green-700 transition flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </button>

                      <button className="bg-green-600 px-4 py-2 rounded-xl hover:bg-green-700 transition flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}