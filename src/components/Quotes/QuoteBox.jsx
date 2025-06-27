import React, { useEffect, useState } from 'react';
import { fetchQuote } from '../../api/quotesApi';

const QuoteBox = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fade, setFade] = useState(false);

    const fadeDuration = 400;

    const getQuote = async () => {
        setFade(true);
        setTimeout(async () => {
            try {
                setLoading(true);
                const data = await fetchQuote();
                setQuote(data);
            } catch (err) {
                setError('Failed to fetch quote');
            } finally {
                setLoading(false);
                setFade(false);
            }
        }, fadeDuration);
    };

    useEffect(() => {
        getQuote();
        const interval = setInterval(getQuote, 60000); // Refresh every 60 seconds
        return () => clearInterval(interval);
    }, []);

    if (error) return <div>{error}</div>;

    return (
        <div
            className="p-6 bg-blue-50 dark:bg-gray-900 border-l-4 border-blue-400 dark:border-blue-600 rounded shadow-md text-center cursor-pointer select-none transition-colors duration-300"
            onClick={getQuote}
            title="Click to refresh the quote"
        >
            <div className={`transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
                style={{ minHeight: '3.5em' }}
            >
                {loading ? (
                    <span className="text-blue-800 dark:text-blue-200">Loading...</span>
                ) : (
                    <>
                        <p className="text-xl italic text-blue-800 dark:text-blue-200 mb-2">"{quote?.content}"</p>
                        <small className="text-blue-600 dark:text-blue-400 font-semibold">- {quote?.author}</small>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuoteBox;