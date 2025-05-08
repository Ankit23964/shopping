import React from 'react';
import { Truck, ShieldCheck, RefreshCcw, Clock, CreditCard } from 'lucide-react';

const PromoSection: React.FC = () => {
  const promos = [
    {
      icon: <Truck className="h-8 w-8 text-primary-600" />,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary-600" />,
      title: 'Secure Payment',
      description: '100% secure transactions',
    },
    {
      icon: <RefreshCcw className="h-8 w-8 text-primary-600" />,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-600" />,
      title: '24/7 Support',
      description: 'Customer service available',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary-600" />,
      title: 'Flexible Payment',
      description: 'Multiple payment options',
    },
  ];

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {promos.map((promo, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{promo.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{promo.title}</h3>
              <p className="text-sm text-gray-600">{promo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;