import { useState } from 'react';
import { Filter, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { dataService } from '@/services/dataService';
import type { Case } from '@/types';

interface MapMatrixProps {
  onNavigate: (page: string, id?: string) => void;
}

const chainLevels = [
  { id: 'compute', name: '算力/云与芯片' },
  { id: 'model', name: '模型' },
  { id: 'toolchain', name: '工具链/中间件' },
  { id: 'application', name: '应用' },
  { id: 'data', name: '数据' },
  { id: 'service', name: '服务/集成' },
];

const categories = [
  { id: 'api_billing', name: 'API计费' },
  { id: 'subscription', name: '订阅制' },
  { id: 'commission', name: '抽佣' },
  { id: 'project', name: '项目制' },
  { id: 'advertising', name: '广告' },
  { id: 'performance', name: '效果付费' },
];

const billingUnitToCategory: Record<string, string> = {
  'token': 'api_billing',
  'subscription': 'subscription',
  'usage': 'subscription',
  'commission': 'commission',
  'project': 'project',
  'advertising': 'advertising',
  'performance': 'performance',
  'gpu_hour': 'api_billing',
  'license': 'subscription',
};

export function MapMatrix({ onNavigate }: MapMatrixProps) {
  const [selectedCell, setSelectedCell] = useState<{chainId: string; catId: string; cases: Case[]} | null>(null);
  const [filters, setFilters] = useState({
    targetAudience: [] as string[],
    scalability: [] as string[],
    dataDependency: [] as string[],
  });

  dataService.getMatrixData();

  const getCellData = (chainId: string, catId: string) => {
    const allCases = dataService.getAllCases();
    const allMethods = dataService.getAllMonetizationMethods();
    
    const filteredCases = allCases.filter(c => {
      if (c.chain_level !== chainId) return false;
      
      const hasMatchingMethod = c.monetization_methods.some(m => {
        const method = allMethods.find(method => method.id === m.method_id);
        if (!method) return false;
        
        const methodCat = method.billing_unit.map(u => billingUnitToCategory[u]).find(u => u === catId);
        if (!methodCat) return false;

        // Apply filters
        if (filters.targetAudience.length > 0) {
          const hasAudience = filters.targetAudience.some(a => 
            method.target_audience.includes(a)
          );
          if (!hasAudience) return false;
        }
        if (filters.scalability.length > 0) {
          if (!filters.scalability.includes(method.scalability_level)) return false;
        }
        if (filters.dataDependency.length > 0) {
          if (!filters.dataDependency.includes(method.data_dependency_level)) return false;
        }
        
        return true;
      });
      
      return hasMatchingMethod;
    });

    return {
      count: filteredCases.length,
      cases: filteredCases,
    };
  };

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-earth-600 mb-3 block">收费对象</Label>
        <div className="space-y-2">
          {['tob', 'toc', 'tod'].map(value => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox 
                checked={filters.targetAudience.includes(value)}
                onCheckedChange={() => toggleFilter('targetAudience', value)}
              />
              <Label className="text-sm text-earth-500 cursor-pointer">
                {value === 'tob' ? '企业' : value === 'toc' ? '消费者' : '开发者'}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-earth-600 mb-3 block">可规模化程度</Label>
        <div className="space-y-2">
          {['high', 'medium', 'low'].map(value => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox 
                checked={filters.scalability.includes(value)}
                onCheckedChange={() => toggleFilter('scalability', value)}
              />
              <Label className="text-sm text-earth-500 cursor-pointer">
                {value === 'high' ? '高' : value === 'medium' ? '中' : '低'}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-earth-600 mb-3 block">数据依赖强度</Label>
        <div className="space-y-2">
          {['high', 'medium', 'low'].map(value => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox 
                checked={filters.dataDependency.includes(value)}
                onCheckedChange={() => toggleFilter('dataDependency', value)}
              />
              <Label className="text-sm text-earth-500 cursor-pointer">
                {value === 'high' ? '高' : value === 'medium' ? '中' : '低'}
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
              <h1 className="text-2xl font-serif font-semibold text-earth-600">产业链变现地图</h1>
              <p className="text-earth-400 text-sm mt-1">
                可视化查看产业链层级与变现方式的交叉矩阵
              </p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 w-fit border-cream-300 text-earth-600">
                  <Filter className="w-4 h-4" />
                  筛选
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-cream-50 border-cream-300">
                <SheetHeader>
                  <SheetTitle className="font-serif text-earth-600">筛选条件</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Matrix */}
        <Card className="overflow-hidden border-cream-300 shadow-elegant">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cream-50">
                  <th className="p-4 text-left font-serif font-semibold text-earth-600 sticky left-0 bg-cream-50 z-10 min-w-32 border-r border-cream-300">
                    产业链层级 \ 变现方式
                  </th>
                  {categories.map(cat => (
                    <th key={cat.id} className="p-4 text-center font-serif font-semibold text-earth-500 min-w-28">
                      {cat.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {chainLevels.map(chain => (
                  <tr key={chain.id} className="hover:bg-cream-50/50">
                    <td className="p-4 font-medium text-earth-600 sticky left-0 bg-white z-10 border-r border-cream-300">
                      {chain.name}
                    </td>
                    {categories.map(cat => {
                      const cellData = getCellData(chain.id, cat.id);
                      const hasData = cellData.count > 0;
                      
                      return (
                        <td key={cat.id} className="p-2">
                          <button
                            className={`w-full h-16 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                              hasData
                                ? 'bg-sage-50 hover:bg-sage-100 border border-sage-200 cursor-pointer'
                                : 'bg-cream-50 border border-cream-200'
                            }`}
                            onClick={() => hasData && setSelectedCell({
                              chainId: chain.id,
                              catId: cat.id,
                              cases: cellData.cases,
                            })}
                            disabled={!hasData}
                          >
                            {hasData ? (
                              <>
                                <span className="w-3 h-3 bg-sage-DEFAULT rounded-full" />
                                <span className="text-xs font-medium text-sage-700">
                                  {cellData.count}案例
                                </span>
                              </>
                            ) : (
                              <span className="w-2 h-2 bg-cream-300 rounded-full" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-6 text-sm text-earth-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-sage-DEFAULT rounded-full" />
            <span>有案例</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cream-300 rounded-full" />
            <span>无案例</span>
          </div>
          <div className="flex items-center gap-2 text-earth-400">
            <Info className="w-4 h-4" />
            <span>点击有案例的格子查看详情</span>
          </div>
        </div>
      </div>

      {/* Cell Detail Dialog */}
      <Dialog open={!!selectedCell} onOpenChange={() => setSelectedCell(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white border-cream-300">
          <DialogHeader>
            <DialogTitle className="font-serif text-earth-600">
              {selectedCell && (
                <>
                  {chainLevels.find(c => c.id === selectedCell.chainId)?.name} × {' '}
                  {categories.find(c => c.id === selectedCell.catId)?.name}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCell && (
            <div className="mt-4">
              <p className="text-sm text-earth-500 mb-4">
                该组合共有 <span className="font-semibold text-earth-600">{selectedCell.cases.length}</span> 个案例
              </p>
              
              <div className="space-y-3">
                {selectedCell.cases.map(c => (
                  <Card 
                    key={c.id}
                    className="p-4 cursor-pointer border-cream-300 hover:border-sage-DEFAULT transition-colors"
                    onClick={() => {
                      setSelectedCell(null);
                      onNavigate('case-detail', c.slug);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {c.logo_url ? (
                        <img 
                          src={c.logo_url} 
                          alt={c.name}
                          className="w-12 h-12 rounded object-contain"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gradient-to-br from-sage-DEFAULT to-sage-300 flex items-center justify-center text-white font-bold">
                          {c.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-serif font-semibold text-earth-600">{c.name}</h4>
                        <p className="text-sm text-earth-400">{c.company_name}</p>
                        <p className="text-sm text-earth-500 mt-1 line-clamp-1">
                          {c.short_description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
