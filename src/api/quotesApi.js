import axios from 'axios';

// Local fallback quotes
const LOCAL_QUOTES = [
  { content: "Stay positive, work hard, make it happen.", author: "Unknown" },
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { content: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { content: "Act as if what you do makes a difference. It does.", author: "William James" },
  { content: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { content: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { content: "Opportunities don't happen, you create them.", author: "Chris Grosser" },
  { content: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
  { content: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { content: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
  { content: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { content: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  { content: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
  { content: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
  { content: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn" },
  { content: "All progress takes place outside the comfort zone.", author: "Michael John Bobak" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
  { content: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
  { content: "If you want to achieve greatness stop asking for permission.", author: "Anonymous" },
  { content: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", author: "Eleanor Roosevelt" },
  { content: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { content: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  { content: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { content: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { content: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" }
];

// Optionally, you can keep the API for future use
const QUOTE_API_URL = 'https://favqs.com/api/qotd';

export async function fetchQuote() {
  try {
    const response = await axios.get(QUOTE_API_URL);
    const data = response.data.quote;
    return {
      content: data.body,
      author: data.author,
      error: null
    };
  } catch (error) {
    // Pick a random local quote if API fails
    const random = LOCAL_QUOTES[Math.floor(Math.random() * LOCAL_QUOTES.length)];
    console.error('Quote API error, using local quote:', error);
    return {
      ...random,
      error: error.message || 'API request failed, using local quote.'
    };
  }
}