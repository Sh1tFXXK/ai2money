import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dataService } from '@/services/dataService';
import type { Case } from '@/types';

interface CaseCompareProps {
  ids: string[];
  onNavigate: (page: string, id?: string) => void;
}

const chainLevelMap: Record<string, string> = {
  'compute': '算力/云与芯片',
  'model': '模型',
  'toolchain': '工具链/中间件',
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

export function CaseCompare({ ids, onNavigate }: CaseCompareProps) {
  const allCases = dataService.getAllCases();
  const compareCases = ids.map(id => allCases.find(c => c.id === id)).filter(Boolean) as Case[];

  if (compareCases.length < 2) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-earth-400 mb-4">请至少选择 2 个案例进行对比</p>
          <Button onClick={() => onNavigate('cases')} className="bg-sage-DEFAULT hover:bg-sage-dark">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回案例库
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount?: number, currency?: string) => {
    if (!amount) return '-';
    const symbol = currency === 'USD' ? '$' : '¥';
    if (amount >= 100000000) {
      return `${symbol}${(amount / 100000000).toFixed(1)}亿`;
    }
    if (amount >= 10000) {
      return `${symbol}${(amount / 10000).toFixed(0)}万`;
    }
    return `${symbol}${amount}`;
  };

  const getPrimaryMonetization = (c: Case) => {
    const primary = c.monetization_methods.find(m => m.is_primary);
    return primary?.name || '-';
  };

  const getPrimaryPricing = (c: Case) => {
    const primary = c.monetization_methods.find(m => m.is_primary);
    if (!primary) return '-';
    const details = primary.pricing_details;
    const firstKey = Object.keys(details).find(k => k !== 'currency' && k !== 'unit');
    if (!firstKey) return '-';
    const value = details[firstKey];
    const currency = details.currency === 'USD' ? '$' : '¥';
    return `${currency}${value}/${details.unit?.replace('per ', '') || ''}`;
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-cream-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-2 text-earth-500 hover:text-earth-600"
                onClick={() => onNavigate('cases')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回案例库
              </Button>
              <h1 className="text-2xl font-serif font-semibold text-earth-600">案例对比</h1>
              <p className="text-earth-400 text-sm mt-1">
                已选择 {compareCases.length}/3 个案例
              </p>
            </div>
            <Button variant="outline" className="gap-2 border-cream-300 text-earth-600">
              <Download className="w-4 h-4" />
              导出报告
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Comparison Table */}
        <Card className="overflow-hidden border-cream-300 shadow-elegant">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cream-50 border-b border-cream-300">
                  <th className="text-left p-4 font-serif font-semibold text-earth-600 w-48 sticky left-0 bg-cream-50 z-10 border-r border-cream-300">
                    对比项
                  </th>
                  {compareCases.map(c => (
                    <th key={c.id} className="p-4 text-left min-w-64">
                      <div className="flex items-start gap-3">
                        {c.logo_url ? (
                          <img 
                            src={c.logo_url} 
                            alt={c.name}
                            className="w-10 h-10 rounded object-contain bg-white border border-cream-300"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gradient-to-br from-sage-DEFAULT to-sage-300 flex items-center justify-center text-white font-bold">
                            {c.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-serif font-semibold text-earth-600">{c.name}</p>
                          <p className="text-xs text-earth-400">{c.company_name}</p>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {/* 产业链层级 */}
                <tr className="bg-white">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-white z-10 border-r border-cream-300">
                    产业链层级
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4">
                      <Badge variant="secondary" className="bg-cream-100 text-earth-600">
                        {chainLevelMap[c.chain_level]}
                      </Badge>
                    </td>
                  ))}
                </tr>

                {/* 细分赛道 */}
                <tr className="bg-cream-50/50">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-cream-50/50 z-10 border-r border-cream-300">
                    细分赛道
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4 text-earth-500">
                      {c.chain_subcategory}
                    </td>
                  ))}
                </tr>

                {/* 公司类型 */}
                <tr className="bg-white">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-white z-10 border-r border-cream-300">
                    公司类型
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4">
                      <Badge variant="outline" className="border-cream-300 text-earth-500">
                        {companyTypeMap[c.company_type]}
                      </Badge>
                    </td>
                  ))}
                </tr>

                {/* 成立时间 */}
                <tr className="bg-cream-50/50">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-cream-50/50 z-10 border-r border-cream-300">
                    成立时间
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4 text-earth-500">
                      {c.founded_year}
                    </td>
                  ))}
                </tr>

                {/* 总部 */}
                <tr className="bg-white">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-white z-10 border-r border-cream-300">
                    总部
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4 text-earth-500">
                      {c.headquarters}
                    </td>
                  ))}
                </tr>

                {/* 估值 */}
                <tr className="bg-cream-50/50">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-cream-50/50 z-10 border-r border-cream-300">
                    估值
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4 text-earth-500">
                      {formatCurrency(c.valuation_amount, c.valuation_currency)}
                    </td>
                  ))}
                </tr>

                {/* 年收入 */}
                <tr className="bg-white">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-white z-10 border-r border-cream-300">
                    年收入
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4 text-earth-500">
                      {formatCurrency(c.annual_revenue, c.revenue_currency)}
                    </td>
                  ))}
                </tr>

                {/* 用户规模 */}
                <tr className="bg-cream-50/50">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-cream-50/50 z-10 border-r border-cream-300">
                    用户规模
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4 text-earth-500">
                      {c.user_count}
                    </td>
                  ))}
                </tr>

                {/* 主要变现方式 */}
                <tr className="bg-white">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-white z-10 border-r border-cream-300">
                    主要变现方式
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4">
                      <Badge className="bg-sage-DEFAULT text-white">
                        {getPrimaryMonetization(c)}
                      </Badge>
                    </td>
                  ))}
                </tr>

                {/* 定价锚点 */}
                <tr className="bg-cream-50/50">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-cream-50/50 z-10 border-r border-cream-300">
                    定价锚点
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4 text-earth-500 font-medium">
                      {getPrimaryPricing(c)}
                    </td>
                  ))}
                </tr>

                {/* 变现方式数量 */}
                <tr className="bg-white">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-white z-10 border-r border-cream-300">
                    变现方式数量
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4 text-earth-500">
                      {c.monetization_methods.length} 种
                    </td>
                  ))}
                </tr>

                {/* 描述 */}
                <tr className="bg-cream-50/50">
                  <td className="p-4 font-medium text-earth-500 sticky left-0 bg-cream-50/50 z-10 border-r border-cream-300 align-top">
                    产品描述
                  </td>
                  {compareCases.map(c => (
                    <td key={c.id} className="p-4 text-earth-500 text-sm align-top">
                      {c.short_description}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" onClick={() => onNavigate('cases')} className="border-cream-300 text-earth-600">
            重新选择
          </Button>
          <Button onClick={() => onNavigate('cases')} className="bg-sage-DEFAULT hover:bg-sage-dark">
            完成对比
          </Button>
        </div>
      </div>
    </div>
  );
}
