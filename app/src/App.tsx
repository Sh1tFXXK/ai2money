import { useState, useEffect } from 'react';
import { dataService } from '@/services/dataService';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { FourDimensionsSection } from '@/sections/FourDimensionsSection';
import { Trends2026Section } from '@/sections/Trends2026Section';
import { PathSelectorSection } from '@/sections/PathSelectorSection';
import { MonetizationList } from '@/sections/MonetizationList';
import { MonetizationDetail } from '@/sections/MonetizationDetail';
import { CaseList } from '@/sections/CaseList';
import { CaseDetail } from '@/sections/CaseDetail';
import { CaseCompare } from '@/sections/CaseCompare';
import { MapMatrix } from '@/sections/MapMatrix';
import { CanvasGenerator } from '@/sections/CanvasGenerator';
import { Toaster } from '@/components/ui/sonner';

type Page = 'home' | 'monetization' | 'monetization-detail' | 'cases' | 'case-detail' | 'case-compare' | 'map' | 'canvas';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedId, setSelectedId] = useState<string>('');
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await dataService.init();
      setIsLoading(false);
    };
    init();
  }, []);

  const navigateTo = (page: string, id?: string) => {
    if (id) setSelectedId(id);
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const handleCompare = (ids: string[]) => {
    setCompareIds(ids);
    setCurrentPage('case-compare');
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-sage-DEFAULT border-t-transparent rounded-full animate-spin" />
          <p className="text-earth-500 font-serif">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header 
        onNavigate={navigateTo} 
        currentPage={currentPage}
      />
      
      <main className="min-h-[calc(100vh-200px)]">
        {currentPage === 'home' && (
          <>
            <HeroSection onNavigate={navigateTo} />
            <FourDimensionsSection onNavigate={navigateTo} />
            <Trends2026Section />
            <PathSelectorSection onNavigate={navigateTo} />
          </>
        )}
        
        {currentPage === 'monetization' && (
          <MonetizationList onNavigate={navigateTo} />
        )}
        
        {currentPage === 'monetization-detail' && (
          <MonetizationDetail 
            id={selectedId} 
            onNavigate={navigateTo}
          />
        )}
        
        {currentPage === 'cases' && (
          <CaseList 
            onNavigate={navigateTo}
            onCompare={handleCompare}
          />
        )}
        
        {currentPage === 'case-detail' && (
          <CaseDetail 
            id={selectedId}
            onNavigate={navigateTo}
          />
        )}
        
        {currentPage === 'case-compare' && (
          <CaseCompare 
            ids={compareIds}
            onNavigate={navigateTo}
          />
        )}
        
        {currentPage === 'map' && (
          <MapMatrix onNavigate={navigateTo} />
        )}
        
        {currentPage === 'canvas' && (
          <CanvasGenerator />
        )}
      </main>
      
      <Footer onNavigate={navigateTo} />
      <Toaster />
    </div>
  );
}

export default App;
