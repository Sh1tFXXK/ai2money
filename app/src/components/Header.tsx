import { useState } from 'react';
import { 
  Database, 
  Map, 
  Briefcase, 
  Palette, 
  Search,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface HeaderProps {
  onNavigate: (page: string, id?: string) => void;
  currentPage: string;
}

const navItems = [
  { id: 'monetization', label: '变现方式', icon: Database },
  { id: 'map', label: '产业链地图', icon: Map },
  { id: 'cases', label: '案例库', icon: Briefcase },
  { id: 'canvas', label: '方案生成', icon: Palette },
];

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('monetization');
      setIsSearchOpen(false);
    }
  };

  const isActive = (page: string) => {
    return currentPage === page || currentPage.startsWith(page + '-');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cream-300 bg-cream-50/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-9 h-9 rounded-lg bg-sage-DEFAULT flex items-center justify-center group-hover:bg-sage-dark transition-colors">
              <span className="text-white font-serif font-semibold text-sm">AI</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif font-semibold text-lg text-earth-600">变现全景报告</span>
              <span className="text-xs text-earth-400 ml-2">2026</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={isActive(item.id) ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                  className={`gap-2 ${isActive(item.id) ? 'bg-sage-DEFAULT hover:bg-sage-dark text-white' : 'text-earth-600 hover:text-sage-DEFAULT hover:bg-sage-50'}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="搜索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 h-9 border-cream-300 focus:border-sage-DEFAULT"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-earth-400 hover:text-earth-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-earth-400 hover:text-sage-DEFAULT hover:bg-sage-50"
                >
                  <Search className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-earth-600">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-cream-50 border-cream-300">
                <div className="flex flex-col gap-4 mt-8">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="搜索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-cream-300"
                    />
                    <Button type="submit" size="icon" className="bg-sage-DEFAULT hover:bg-sage-dark">
                      <Search className="w-4 h-4" />
                    </Button>
                  </form>

                  {/* Mobile Nav */}
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.id}
                          variant={isActive(item.id) ? 'default' : 'outline'}
                          className={`justify-start gap-2 ${isActive(item.id) ? 'bg-sage-DEFAULT hover:bg-sage-dark text-white' : 'border-cream-300 text-earth-600 hover:bg-sage-50'}`}
                          onClick={() => onNavigate(item.id)}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Button>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
