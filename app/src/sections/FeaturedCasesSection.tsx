import { ArrowRight, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dataService } from '@/services/dataService';
import type { Case } from '@/types';

interface FeaturedCasesSectionProps {
  onNavigate: (page: string, id?: string) => void;
}

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

export function FeaturedCasesSection({ onNavigate }: FeaturedCasesSectionProps) {
  const cases = dataService.getFeaturedCases().slice(0, 3);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              精选案例
            </h2>
            <p className="text-slate-600">
              学习头部 AI 公司的变现策略与增长路径
            </p>
          </div>
          <Button 
            variant="outline" 
            className="hidden sm:flex gap-2"
            onClick={() => onNavigate('cases')}
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <CaseCard 
              key={c.id} 
              caseItem={c} 
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 text-center sm:hidden">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => onNavigate('cases')}
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

interface CaseCardProps {
  caseItem: Case;
  onNavigate: (page: string, id?: string) => void;
}

function CaseCard({ caseItem, onNavigate }: CaseCardProps) {
  const primaryMonetization = caseItem.monetization_methods.find(m => m.is_primary);
  const priceDisplay = primaryMonetization?.pricing_details;

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
      onClick={() => onNavigate('case-detail', caseItem.slug)}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {caseItem.logo_url ? (
              <img 
                src={caseItem.logo_url} 
                alt={caseItem.name}
                className="w-10 h-10 rounded-lg object-contain bg-white border border-slate-100 p-1"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                {caseItem.name.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {caseItem.name}
              </h3>
              <p className="text-xs text-slate-500">{caseItem.company_name}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {chainLevelMap[caseItem.chain_level] || caseItem.chain_level}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {companyTypeMap[caseItem.company_type] || caseItem.company_type}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {caseItem.short_description}
        </p>

        {/* Pricing */}
        {priceDisplay && (
          <div className="flex items-center gap-2 text-sm text-slate-700 mb-3">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-medium">
              {priceDisplay.currency === 'USD' ? '$' : '¥'}
              {typeof Object.values(priceDisplay)[0] === 'number' 
                ? Object.values(priceDisplay)[0] 
                : priceDisplay[Object.keys(priceDisplay)[0]]}
              /{priceDisplay.unit?.replace('per ', '')}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {caseItem.view_count > 1000 ? `${(caseItem.view_count / 1000).toFixed(1)}k` : caseItem.view_count} 浏览
          </div>
          <div className="flex items-center gap-1">
            {caseItem.monetization_methods.length} 种变现方式
          </div>
        </div>
      </div>
    </Card>
  );
}
