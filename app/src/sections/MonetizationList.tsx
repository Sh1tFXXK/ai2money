import { useState, useMemo } from 'react';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
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
import type { MonetizationMethod } from '@/types';

interface MonetizationListProps {
  onNavigate: (page: string, id?: string) => void;
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

const targetAudiences = [
  { value: 'tob', label: '企业 (ToB)' },
  { value: 'toc', label: '消费者 (ToC)' },
  { value: 'tod', label: '开发者 (ToD)' },
];

const billingUnits = [
  { value: 'token', label: 'Token' },
  { value: 'seat', label: '座位/用户数' },
  { value: 'gpu_hour', label: 'GPU-hour' },
  { value: 'project', label: '项目制' },
  { value: 'commission', label: '抽佣' },
  { value: 'subscription', label: '订阅' },
  { value: 'usage', label: '用量' },
  { value: 'license', label: '授权费' },
  { value: 'performance', label: '效果付费' },
];

const marginLevelMap: Record<string, { label: string; color: string }> = {
  'very_high': { label: '极高', color: 'bg-sage-100 text-sage-700' },
  'high': { label: '高', color: 'bg-sage-50 text-sage-600' },
  'medium': { label: '中', color: 'bg-sky-100 text-sky-700' },
  'low': { label: '低', color: 'bg-amber-100 text-amber-700' },
  'very_low': { label: '极低', color: 'bg-earth-100 text-earth-700' },
};

const chainLevelMap: Record<string, string> = {
  'compute': '算力/云与芯片',
  'model': '模型',
  'toolchain': '工具链',
  'application': '应用',
  'data': '数据',
  'service': '服务/集成',
};

export function MonetizationList({ onNavigate }: MonetizationListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [chainLevel, setChainLevel] = useState('all');
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  const allMethods = dataService.getAllMonetizationMethods();

  const filteredMethods = useMemo(() => {
    return allMethods.filter(method => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = method.name.toLowerCase().includes(query);
        const matchDesc = method.short_description.toLowerCase().includes(query);
        if (!matchName && !matchDesc) return false;
      }

      // Chain level
      if (chainLevel !== 'all' && method.chain_level !== chainLevel) {
        return false;
      }

      // Target audience
      if (selectedAudiences.length > 0) {
        const hasAudience = selectedAudiences.some(a => 
          method.target_audience.includes(a)
        );
        if (!hasAudience) return false;
      }

      // Billing unit
      if (selectedUnits.length > 0) {
        const hasUnit = selectedUnits.some(u => 
          method.billing_unit.includes(u)
        );
        if (!hasUnit) return false;
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
  }, [allMethods, searchQuery, chainLevel, selectedAudiences, selectedUnits, sortBy]);

  const toggleAudience = (value: string) => {
    setSelectedAudiences(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const toggleUnit = (value: string) => {
    setSelectedUnits(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
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

      {/* Target Audience */}
      <div>
        <Label className="text-sm font-medium text-earth-600 mb-3 block">收费对象</Label>
        <div className="space-y-2">
          {targetAudiences.map(audience => (
            <div key={audience.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`audience-${audience.value}`}
                checked={selectedAudiences.includes(audience.value)}
                onCheckedChange={() => toggleAudience(audience.value)}
              />
              <Label 
                htmlFor={`audience-${audience.value}`}
                className="text-sm text-earth-500 cursor-pointer"
              >
                {audience.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Unit */}
      <div>
        <Label className="text-sm font-medium text-earth-600 mb-3 block">计费单位</Label>
        <div className="space-y-2">
          {billingUnits.map(unit => (
            <div key={unit.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`unit-${unit.value}`}
                checked={selectedUnits.includes(unit.value)}
                onCheckedChange={() => toggleUnit(unit.value)}
              />
              <Label 
                htmlFor={`unit-${unit.value}`}
                className="text-sm text-earth-500 cursor-pointer"
              >
                {unit.label}
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
              <h1 className="text-2xl font-serif font-semibold text-earth-600">变现方式库</h1>
              <p className="text-earth-400 text-sm mt-1">
                共 {filteredMethods.length} 种变现方式
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-400" />
                <Input
                  placeholder="搜索变现方式..."
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

            {/* Results */}
            {filteredMethods.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-earth-400">没有找到匹配的变现方式</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'space-y-4'
              }>
                {filteredMethods.map(method => (
                  <MethodCard 
                    key={method.id} 
                    method={method} 
                    viewMode={viewMode}
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

interface MethodCardProps {
  method: MonetizationMethod;
  viewMode: 'grid' | 'list';
  onNavigate: (page: string, id?: string) => void;
}

function MethodCard({ method, viewMode, onNavigate }: MethodCardProps) {
  const marginInfo = marginLevelMap[method.gross_margin_level] || { 
    label: method.gross_margin_level, 
    color: 'bg-cream-100 text-earth-600' 
  };

  if (viewMode === 'list') {
    return (
      <Card 
        className="p-4 cursor-pointer border-cream-300 hover:border-sage-DEFAULT hover:shadow-elegant transition-all bg-white"
        onClick={() => onNavigate('monetization-detail', method.slug)}
      >
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs bg-cream-100 text-earth-600">
                {chainLevelMap[method.chain_level] || method.chain_level}
              </Badge>
              <Badge className={`text-xs ${marginInfo.color}`}>
                毛利 {marginInfo.label}
              </Badge>
            </div>
            <h3 className="font-serif font-semibold text-earth-600">{method.name}</h3>
            <p className="text-sm text-earth-400 line-clamp-1">{method.short_description}</p>
          </div>
          <div className="text-right text-sm text-earth-400">
            <div>{method.case_count} 案例</div>
            <div>{method.view_count} 浏览</div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="cursor-pointer border-cream-300 hover:border-sage-DEFAULT hover:shadow-elegant transition-all bg-white overflow-hidden"
      onClick={() => onNavigate('monetization-detail', method.slug)}
    >
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="text-xs bg-cream-100 text-earth-600">
            {chainLevelMap[method.chain_level]}
          </Badge>
          <Badge className={`text-xs ${marginInfo.color}`}>
            毛利 {marginInfo.label}
          </Badge>
        </div>
        <h3 className="font-serif font-semibold text-earth-600 mb-2">{method.name}</h3>
        <p className="text-sm text-earth-400 mb-4 line-clamp-2">
          {method.short_description}
        </p>
        <div className="flex items-center justify-between text-xs text-earth-400 pt-3 border-t border-cream-200">
          <span>{method.billing_unit_labels[0]}</span>
          <span>{method.case_count} 案例</span>
        </div>
      </div>
    </Card>
  );
}
