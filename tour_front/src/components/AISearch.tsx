import { useState } from "react";

const API_URL = "http://localhost:5000/api/chat";

const AISearch = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: query }),

      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      setAnswer(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h2 className="mb-2 text-xl font-semibold">AI Search</h2>

      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Ask anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={handleSearch}
        disabled={loading}
        className="px-4 py-2 mt-3 text-white bg-blue-600 rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Search"}
      </button>

      {error && <p className="mt-3 text-red-500">{error}</p>}

      {answer && (
        <div className="p-3 mt-4 border rounded bg-gray-50">
          <strong>Answer:</strong>
          <p className="mt-1 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AISearch;
