import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useAppSelector } from '../../hooks/useAppSelector';
import ProductCard from '../products/ProductCard';
import LoadingProductCard from '../products/LoadingProductCard';

type Product = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  // Add other fields used in ProductCard
};

const FlashDealsSection: React.FC = () => {
  const { products = [], loading } = useAppSelector((state) => state.products);

  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
  });

  // Filter and sort products based on discount percentage
  const flashDeals = [...products]
    .filter((product) => typeof product.discountPercentage === 'number')
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 4);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          return { hours: 12, minutes: 0, seconds: 0 };
        }

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 to-red-500 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold sm:text-4xl">Flash Deals</h2>
            <p className="mt-2 text-pink-100">
              Hurry up! These amazing deals won&apos;t last long.
            </p>
          </div>

          <div className="flex items-center bg-white/20 rounded-lg py-3 px-5 backdrop-blur-sm">
            <Clock className="h-6 w-6 mr-3" />
            <span className="text-lg font-medium">Ends in:</span>
            <div className="ml-3 flex space-x-2">
              {['hours', 'minutes', 'seconds'].map((key, i) => (
                <React.Fragment key={key}>
                  <div className="bg-white text-red-600 rounded px-2 py-1 min-w-[2.5rem] text-center">
                    <span className="text-xl font-bold">{formatTime(timeLeft[key as keyof typeof timeLeft])}</span>
                  </div>
                  {i < 2 && <span className="text-xl font-bold">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-3">
                  <LoadingProductCard />
                </div>
              ))
            : flashDeals.map((product) => (
                <div key={product.id} className="bg-white rounded-lg p-3">
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FlashDealsSection;
