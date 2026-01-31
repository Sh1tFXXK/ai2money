import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dataService } from '@/services/dataService';
import type { MonetizationMethod } from '@/types';

interface FeaturedMethodsSectionProps {
  onNavigate: (page: string, id?: string) => void;
}

const marginLevelMap: Record<string, { label: string; color: string }> = {
  'very_high': { label: '极高', color: 'bg-green-100 text-green-700' },
  'high': { label: '高', color: 'bg-emerald-100 text-emerald-700' },
  'medium': { label: '中', color: 'bg-yellow-100 text-yellow-700' },
  'low': { label: '低', color: 'bg-orange-100 text-orange-700' },
  'very_low': { label: '极低', color: 'bg-red-100 text-red-700' },
};

const chainLevelMap: Record<string, string> = {
  'compute': '算力/云与芯片',
  'model': '模型',
  'toolchain': '工具链',
  'application': '应用',
  'data': '数据',
  'service': '服务/集成',
};

export function FeaturedMethodsSection({ onNavigate }: FeaturedMethodsSectionProps) {
  const methods = dataService.getFeaturedMonetizationMethods().slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              热门变现方式
            </h2>
            <p className="text-slate-600">
              浏览最受欢迎的 AI 产业链变现模式
            </p>
          </div>
          <Button 
            variant="outline" 
            className="hidden sm:flex gap-2"
            onClick={() => onNavigate('monetization')}
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method) => (
            <MethodCard 
              key={method.id} 
              method={method} 
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 text-center sm:hidden">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => onNavigate('monetization')}
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

interface MethodCardProps {
  method: MonetizationMethod;
  onNavigate: (page: string, id?: string) => void;
}

function MethodCard({ method, onNavigate }: MethodCardProps) {
  const marginInfo = marginLevelMap[method.gross_margin_level] || { label: method.gross_margin_level, color: 'bg-slate-100 text-slate-700' };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
      onClick={() => onNavigate('monetization-detail', method.slug)}
    >
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {chainLevelMap[method.chain_level] || method.chain_level}
          </Badge>
          <Badge className={`text-xs ${marginInfo.color}`}>
            毛利 {marginInfo.label}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {method.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {method.short_description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" />
            {method.billing_unit_labels[0]}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {method.case_count} 案例
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {method.view_count > 1000 ? `${(method.view_count / 1000).toFixed(1)}k` : method.view_count}
          </div>
        </div>
      </div>
    </Card>
  );
}
