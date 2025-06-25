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
            className="p-6 bg-blue-50 border-l-4 border-blue-400 rounded shadow-md text-center cursor-pointer select-none"
            onClick={getQuote}
            title="Click to refresh the quote"
        >
            <div className={`transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
                style={{ minHeight: '3.5em' }}
            >
                {loading ? (
                    <span>Loading...</span>
                ) : (
                    <>
                        <p className="text-xl italic text-blue-800 mb-2">"{quote?.content}"</p>
                        <small className="text-blue-600 font-semibold">- {quote?.author}</small>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuoteBox;