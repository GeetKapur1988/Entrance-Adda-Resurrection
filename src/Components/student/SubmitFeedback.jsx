import { useState } from 'react';
import { supabase } from "../../utils/SupabaseClient";

const FeedbackForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('user_feedback').insert([{ email, message }]);

    if (error) {
      setStatus('Something went wrong. Please try again.');
    } else {
      setStatus('Thanks for your feedback!');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-black bg-opacity-40 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
       <input
  type="email"
  placeholder="Your Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-2 mb-4 rounded-md bg-white text-black placeholder-gray-500"
  required
/>
<textarea
  rows="4"
  placeholder="Your Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  className="w-full p-2 mb-4 rounded-md bg-white text-black placeholder-gray-500"
  required
/>
        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
        {status && <p className="mt-4 text-sm text-green-400">{status}</p>}
      </form>
    </div>
  );
};

export default FeedbackForm;
