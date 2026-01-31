import { useState, useMemo } from 'react';
import { Search, Filter, Grid3X3, List, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { dataService } from '@/services/dataService';
import type { Case } from '@/types';

interface CaseListProps {
  onNavigate: (page: string, id?: string) => void;
  onCompare: (ids: string[]) => void;
}

const chainLevels = [
  { value: 'all', label: '全部层级' },
  { value: 'compute', label: '算力/云与芯片' },
  { value: 'model', label: '模型' },
  { value: 'toolchain', label: '工具链/中间件' },
  { value: 'application', label: '应用' },
  { value: 'data', label: '数据' },
  { value: 'service', label: '服务/集成' },
];

const companyTypes = [
  { value: 'public', label: '上市公司' },
  { value: 'unicorn', label: '独角兽' },
  { value: 'startup', label: '初创公司' },
  { value: 'enterprise', label: '大型企业' },
];

const chainLevelMap: Record<string, string> = {
  'compute': '算力/云与芯片',
  'model': '模型',
  'toolchain': '工具链',
  'application': '应用',
  'data': '数据',
  'service': '服务/集成',
};

const companyTypeMap: Record<string, string> = {
  'public': '上市公司',
  'unicorn': '独角兽',
  'startup': '初创公司',
  'enterprise': '大型企业',
};

export function CaseList({ onNavigate, onCompare }: CaseListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [chainLevel, setChainLevel] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCases, setSelectedCases] = useState<string[]>([]);

  const allCases = dataService.getAllCases();

  const filteredCases = useMemo(() => {
    return allCases.filter(c => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(query);
        const matchCompany = c.company_name.toLowerCase().includes(query);
        const matchDesc = c.short_description.toLowerCase().includes(query);
        if (!matchName && !matchCompany && !matchDesc) return false;
      }

      // Chain level
      if (chainLevel !== 'all' && c.chain_level !== chainLevel) {
        return false;
      }

      // Company type
      if (selectedTypes.length > 0 && !selectedTypes.includes(c.company_type)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.view_count - a.view_count;
        case 'newest':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [allCases, searchQuery, chainLevel, selectedTypes, sortBy]);

  const toggleType = (value: string) => {
    setSelectedTypes(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const toggleCaseSelection = (caseId: string) => {
    setSelectedCases(prev => {
      if (prev.includes(caseId)) {
        return prev.filter(id => id !== caseId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, caseId];
    });
  };

  const handleCompare = () => {
    if (selectedCases.length >= 2) {
      onCompare(selectedCases);
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Chain Level */}
      <div>
        <Label className="text-sm font-medium text-earth-600 mb-3 block">产业链层级</Label>
        <Select value={chainLevel} onValueChange={setChainLevel}>
          <SelectTrigger className="border-cream-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {chainLevels.map(level => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Company Type */}
      <div>
        <Label className="text-sm font-medium text-earth-600 mb-3 block">公司类型</Label>
        <div className="space-y-2">
          {companyTypes.map(type => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`type-${type.value}`}
                checked={selectedTypes.includes(type.value)}
                onCheckedChange={() => toggleType(type.value)}
              />
              <Label 
                htmlFor={`type-${type.value}`}
                className="text-sm text-earth-500 cursor-pointer"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-cream-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-serif font-semibold text-earth-600">案例库</h1>
              <p className="text-earth-400 text-sm mt-1">
                共 {filteredCases.length} 个案例
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-400" />
                <Input
                  placeholder="搜索案例..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 border-cream-300 focus:border-sage-DEFAULT"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-cream-300 p-5 sticky top-24 shadow-elegant">
              <h3 className="font-serif font-semibold text-earth-600 mb-4">筛选条件</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-2 border-cream-300">
                      <Filter className="w-4 h-4" />
                      筛选
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 bg-cream-50 border-cream-300">
                    <SheetHeader>
                      <SheetTitle className="font-serif text-earth-600">筛选条件</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 border-cream-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">最热门</SelectItem>
                    <SelectItem value="newest">最新</SelectItem>
                    <SelectItem value="name">名称</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={compareMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setCompareMode(!compareMode);
                    if (compareMode) {
                      setSelectedCases([]);
                    }
                  }}
                  className={compareMode ? 'bg-sage-DEFAULT hover:bg-sage-dark' : 'border-cream-300'}
                >
                  {compareMode ? '退出对比' : '对比模式'}
                </Button>
              </div>

              <div className="flex items-center gap-1 border border-cream-300 rounded-lg p-1 bg-white">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Compare Bar */}
            {compareMode && (
              <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-sage-700">
                    已选择 {selectedCases.length}/3 个案例
                  </span>
                  {selectedCases.length > 0 && (
                    <div className="flex gap-2">
                      {selectedCases.map(id => {
                        const c = allCases.find(c => c.id === id);
                        return c ? (
                          <Badge key={id} variant="secondary" className="bg-white text-earth-600">
                            {c.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                <Button 
                  size="sm" 
                  disabled={selectedCases.length < 2}
                  onClick={handleCompare}
                  className="bg-sage-DEFAULT hover:bg-sage-dark"
                >
                  开始对比
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Results */}
            {filteredCases.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-earth-400">没有找到匹配的案例</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'space-y-4'
              }>
                {filteredCases.map(c => (
                  <CaseCard 
                    key={c.id} 
                    caseItem={c} 
                    viewMode={viewMode}
                    compareMode={compareMode}
                    isSelected={selectedCases.includes(c.id)}
                    selectionCount={selectedCases.length}
                    onToggleSelect={() => toggleCaseSelection(c.id)}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CaseCardProps {
  caseItem: Case;
  viewMode: 'grid' | 'list';
  compareMode: boolean;
  isSelected: boolean;
  selectionCount: number;
  onToggleSelect: () => void;
  onNavigate: (page: string, id?: string) => void;
}

function CaseCard({ caseItem, viewMode, compareMode, isSelected, selectionCount, onToggleSelect, onNavigate }: CaseCardProps) {
  const primaryMonetization = caseItem.monetization_methods.find(m => m.is_primary);

  if (viewMode === 'list') {
    return (
      <Card 
        className={`p-4 transition-all ${
          compareMode && isSelected 
            ? 'border-sage-DEFAULT bg-sage-50' 
            : 'border-cream-300 hover:border-sage-DEFAULT hover:shadow-elegant'
        } bg-white`}
      >
        <div className="flex items-center gap-4">
          {compareMode && (
            <Checkbox 
              checked={isSelected}
              onCheckedChange={onToggleSelect}
              disabled={!isSelected && selectionCount >= 3}
            />
          )}
          <div 
            className="flex-1 cursor-pointer"
            onClick={() => !compareMode && onNavigate('case-detail', caseItem.slug)}
          >
            <div className="flex items-center gap-3">
              {caseItem.logo_url ? (
                <img src={caseItem.logo_url} alt={caseItem.name} className="w-10 h-10 rounded object-contain" />
              ) : (
                <div className="w-10 h-10 rounded bg-gradient-to-br from-sage-DEFAULT to-sage-300 flex items-center justify-center text-white font-bold">
                  {caseItem.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-serif font-semibold text-earth-600">{caseItem.name}</h3>
                <p className="text-xs text-earth-400">{caseItem.company_name}</p>
              </div>
            </div>
          </div>
          <div className="text-right text-sm text-earth-400">
            <div>{chainLevelMap[caseItem.chain_level]}</div>
            <div>{caseItem.monetization_methods.length} 种变现</div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={`overflow-hidden transition-all ${
        compareMode && isSelected 
          ? 'border-sage-DEFAULT bg-sage-50' 
          : 'border-cream-300 hover:border-sage-DEFAULT hover:shadow-elegant'
      } bg-white`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {caseItem.logo_url ? (
              <img src={caseItem.logo_url} alt={caseItem.name} className="w-10 h-10 rounded object-contain" />
            ) : (
              <div className="w-10 h-10 rounded bg-gradient-to-br from-sage-DEFAULT to-sage-300 flex items-center justify-center text-white font-bold">
                {caseItem.name.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="font-serif font-semibold text-earth-600">{caseItem.name}</h3>
              <p className="text-xs text-earth-400">{caseItem.company_name}</p>
            </div>
          </div>
          {compareMode && (
            <Checkbox 
              checked={isSelected}
              onCheckedChange={onToggleSelect}
              disabled={!isSelected && selectionCount >= 3}
            />
          )}
        </div>

        <div 
          className={`${!compareMode ? 'cursor-pointer' : ''}`}
          onClick={() => !compareMode && onNavigate('case-detail', caseItem.slug)}
        >
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className="text-xs bg-cream-100 text-earth-600">
              {chainLevelMap[caseItem.chain_level]}
            </Badge>
            <Badge variant="outline" className="text-xs border-cream-300 text-earth-500">
              {companyTypeMap[caseItem.company_type]}
            </Badge>
          </div>

          <p className="text-sm text-earth-400 mb-4 line-clamp-2">
            {caseItem.short_description}
          </p>

          {primaryMonetization && (
            <div className="text-sm text-earth-500 mb-3">
              <span className="text-earth-400">主要变现：</span>
              <span className="font-medium text-earth-600">{primaryMonetization.name}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-earth-400 pt-3 border-t border-cream-200">
            <span>{caseItem.view_count} 浏览</span>
            <span>{caseItem.monetization_methods.length} 种变现方式</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
