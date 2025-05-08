import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
type CategoryType = { name: string };
const CategorySection: React.FC = () => {
  const { categories } = useAppSelector((state) => state.products);

  const categoryImages: Record<string, string> = {
    'smartphones': 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=800',
    'laptops': 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    'fragrances': 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
    'skincare': 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=800',
    'groceries': 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
    'home-decoration': 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    'furniture': 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    'tops': 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
    'womens-dresses': 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
    'womens-shoes': 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=800',
    'mens-shirts': 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800',
    'mens-shoes': 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=800',
    'mens-watches': 'https://images.pexels.com/photos/9978720/pexels-photo-9978720.jpeg?auto=compress&cs=tinysrgb&w=800',
    'womens-watches': 'https://images.pexels.com/photos/9978673/pexels-photo-9978673.jpeg?auto=compress&cs=tinysrgb&w=800',
    'womens-bags': 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    'womens-jewellery': 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
    'sunglasses': 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800',
    'automotive': 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=800',
    'motorcycle': 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&cs=tinysrgb&w=800',
    'lighting': 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=800'
  };

  const defaultImage = 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800';

  const displayCategories = Array.isArray(categories) ? categories.slice(0, 6) : [];

  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Shop by Category</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((category, index) => {
            //const categoryStr = typeof category === 'string' ? category : category.name; // Safely access the name property
            const categoryStr = typeof category === 'string' ? category : (category as CategoryType).name;
            const categoryName = categoryStr.replace(/-/g, ' ');


            return (
              <Link
                key={`category-${categoryStr}-${index}`}
                to={`/category/${categoryStr}`}
                className="group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <img
                    src={categoryImages[categoryStr] || defaultImage}
                    alt={categoryName}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl font-semibold text-white capitalize">
                      {categoryName}
                    </h3>
                    <p className="mt-1 text-white/80 text-sm">Explore Collection</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/categories"
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
          >
            View All Categories
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
