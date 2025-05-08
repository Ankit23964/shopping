import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-primary-900 to-primary-700 text-white">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase bg-primary-600 bg-opacity-50 rounded-full">New collection</span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Discover the Latest Tech Trends
            </h1>
            <p className="text-primary-100 text-lg mb-8 max-w-lg">
              Explore our curated collection of premium gadgets and accessories. Shop the future today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                rightIcon={<ArrowRight className="ml-1" />}
                className="font-semibold"
              >
                Shop Now
              </Button>
              <Link to="/categories">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-primary-800 font-semibold"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full blur-3xl opacity-20"></div>
            <img
              src="https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Featured product"
              className="relative z-10 max-h-[500px] rounded-lg object-cover object-center shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;