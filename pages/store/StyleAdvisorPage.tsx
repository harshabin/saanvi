
import React, { useState } from 'react';
import { getStyleAdvice } from '../../services/geminiService';
import { Product } from '../../types';
import { SparklesIcon } from '../../components/icons/Icons';

interface StyleAdvisorPageProps {
  products: Product[];
}

const StyleAdvisorPage: React.FC<StyleAdvisorPageProps> = ({ products }) => {
  const [occasion, setOccasion] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAdvice = async () => {
    if (!occasion.trim()) return;
    setIsLoading(true);
    setAdvice('');
    try {
      const result = await getStyleAdvice(occasion, products);
      setAdvice(result);
    } catch (error) {
      setAdvice('Sorry, I could not fetch advice at the moment. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const formattedAdvice = advice.split('\n').map((line, index) => {
    if (line.startsWith('* ') || line.startsWith('- ')) {
      return <li key={index} className="mb-2">{line.substring(2)}</li>;
    }
    if (/^\w+\s*:\s*/.test(line)) {
      const parts = line.split(':');
      return <p key={index}><strong className="text-primary">{parts[0]}:</strong>{parts.slice(1).join(':')}</p>
    }
    return <p key={index} className="mb-4">{line}</p>;
  });


  return (
    <div className="bg-white">
        <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
            <SparklesIcon />
            <h1 className="text-4xl font-bold text-primary mb-4">AI Style Advisor</h1>
            <p className="text-lg text-gray-600 mb-8">
            Tell us the occasion, and our AI stylist will create the perfect look for you from our collection.
            </p>
        </div>

        <div className="max-w-2xl mx-auto">
            <div className="bg-neutral-light p-6 rounded-lg shadow-inner">
            <textarea
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder="e.g., 'a casual weekend brunch with friends' or 'a formal wedding reception'"
                className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
                rows={3}
            />
            <button
                onClick={handleGetAdvice}
                disabled={isLoading}
                className="w-full mt-4 bg-secondary text-primary-dark font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-primary-dark rounded-full animate-spin"></div>
                    Generating Advice...
                </>
                ) : 'Get Style Advice'}
            </button>
            </div>

            {advice && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Your Personalized Recommendation:</h2>
                <div className="prose max-w-none text-gray-700">
                    {formattedAdvice}
                </div>
            </div>
            )}
        </div>
        </div>
    </div>
  );
};

export default StyleAdvisorPage;
