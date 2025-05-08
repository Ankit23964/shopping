import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts, fetchCategories } from '../store/slices/productSlice';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';
import NewArrivalsSection from '../components/home/NewArrivalsSection';
import FlashDealsSection from '../components/home/FlashDealsSection';
import PromoSection from '../components/home/PromoSection';
import ProductQuickView from '../components/products/ProductQuickView';
import { useAppSelector } from '../hooks/useAppSelector';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isQuickViewOpen } = useAppSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 20, skip: 0 }));
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <PromoSection />
      <CategorySection />
      <FeaturedProductsSection />
      <FlashDealsSection />
      <NewArrivalsSection />
      
      {isQuickViewOpen && <ProductQuickView />}
    </div>
  );
};

export default HomePage;