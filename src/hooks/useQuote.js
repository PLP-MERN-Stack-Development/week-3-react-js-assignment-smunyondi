import { useState, useEffect } from 'react';
import { fetchQuote } from '../api/quotesApi';

const useQuote = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getQuote = async () => {
            try {
                setLoading(true);
                const data = await fetchQuote();
                setQuote(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getQuote();
    }, []);

    return { quote, loading, error };
};

export default useQuote;