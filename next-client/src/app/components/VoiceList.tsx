'use client';

import React, { useEffect, useState } from 'react';
import { Voice, VoicesApiResponse } from '../../types';

const VoiceList: React.FC = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchVoices = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/voices?page=${pageNum}&limit=10`);
      const response: { data: VoicesApiResponse } = await res.json();
      console.log('Fetched voices data:', response.data); // Add this line for debugging
      if (response.data?.voices?.length) setVoices((prev) => [...prev, ...response.data.voices]);
      setHasMore(response.data?.voices?.length > 0);
    } catch (err) {
      console.error('Failed to fetch voices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoices(page);
  }, [page]);

  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Voices</h2>

      {voices.length === 0 && !loading && (
        <div className="text-center text-gray-400">No voices available</div>
      )}

      {voices.map((voice) => (
        <div
          key={voice.id}
          className="p-2 mb-2 bg-gray-700 rounded-lg border border-gray-600"
        >
          {voice.name} ({voice.type})
        </div>
      ))}

      {loading && <div className="text-center mt-2">Loading...</div>}

      {!loading && hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceList;
