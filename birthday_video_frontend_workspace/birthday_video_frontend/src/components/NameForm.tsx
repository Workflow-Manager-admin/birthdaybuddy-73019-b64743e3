import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Centered input form for friend's name
 */
const NameForm: React.FC<{
  onSubmitFriendName: (name: string) => void;
  lastEnteredName?: string;
}> = ({ onSubmitFriendName, lastEnteredName }) => {
  const [name, setName] = useState(lastEnteredName ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 1) return;
    onSubmitFriendName(name.trim());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-amber-50 to-indigo-100">
      <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
        <h1
          className="text-4xl font-extrabold mb-2 text-primary"
          style={{
            fontFamily: "cursive, Comic Sans MS, sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          🎉 Happy Birthday Video! 🎈
        </h1>
        <p className="mb-6 text-secondary text-lg text-center max-w-xs">
          Enter your friend's name and create a magical birthday greeting video!
        </p>
        <form
          className="flex flex-col gap-4 items-center w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            required
            placeholder="Friend's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-5 py-3 rounded-lg border border-primary text-xl transition focus:border-secondary focus:ring-2 focus:ring-secondary w-full placeholder:text-accent text-center font-semibold"
            maxLength={32}
            autoFocus
          />
          <button
            type="submit"
            disabled={name.trim().length < 1}
            className="w-full bg-accent hover:bg-primary text-white font-bold py-3 rounded-lg shadow-md transition text-xl"
            aria-label="Generate personalized birthday video"
          >
            Generate Video 🎬
          </button>
        </form>
      </div>
      <footer className="mt-10 text-center text-sm text-secondary opacity-70">
        Powered by Remotion • Made with 🎂 and ☀️
      </footer>
    </div>
  );
};

export default NameForm;
