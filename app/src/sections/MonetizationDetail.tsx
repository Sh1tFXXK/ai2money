import { useState } from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Layers,
  Target,
  Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dataService } from '@/services/dataService';

interface MonetizationDetailProps {
  id: string;
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

const marginLevelMap: Record<string, { label: string; color: string; bgColor: string }> = {
  'very_high': { label: '极高 (>80%)', color: 'text-sage-700', bgColor: 'bg-sage-100' },
  'high': { label: '高 (60-80%)', color: 'text-sage-600', bgColor: 'bg-sage-50' },
  'medium': { label: '中 (40-60%)', color: 'text-sky-700', bgColor: 'bg-sky-100' },
  'low': { label: '低 (20-40%)', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  'very_low': { label: '极低 (<20%)', color: 'text-earth-700', bgColor: 'bg-earth-100' },
};

const scalabilityMap: Record<string, string> = {
  'high': '高',
  'medium': '中',
  'low': '低',
};

export function MonetizationDetail({ id, onNavigate }: MonetizationDetailProps) {
  const method = dataService.getMonetizationMethodById(id);
  const relatedCases = method ? dataService.getCasesByMonetizationMethod(method.id) : [];
  const [activeTab, setActiveTab] = useState('overview');

  if (!method) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-earth-400 mb-4">未找到该变现方式</p>
          <Button onClick={() => onNavigate('monetization')} className="bg-sage-DEFAULT hover:bg-sage-dark">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回列表
          </Button>
        </div>
      </div>
    );
  }

  const marginInfo = marginLevelMap[method.gross_margin_level] || { 
    label: method.gross_margin_level, 
    color: 'text-earth-600',
    bgColor: 'bg-cream-100'
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-cream-300">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4 text-earth-500 hover:text-earth-600"
            onClick={() => onNavigate('monetization')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回列表
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="text-xs bg-cream-100 text-earth-600">
                  {chainLevelMap[method.chain_level]}
                </Badge>
                {method.target_audience_labels.map((label, i) => (
                  <Badge key={i} variant="outline" className="text-xs border-cream-300 text-earth-500">
                    {label}
                  </Badge>
                ))}
                <Badge className={`text-xs ${marginInfo.bgColor} ${marginInfo.color}`}>
                  毛利 {marginInfo.label}
                </Badge>
              </div>
              <h1 className="text-3xl font-serif font-semibold text-earth-600">{method.name}</h1>
              <p className="text-earth-400 mt-2 max-w-2xl">{method.short_description}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-earth-400">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {method.view_count} 浏览
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {method.like_count} 点赞
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Basic Info */}
              <Card className="p-5 border-cream-300 bg-white shadow-elegant">
                <h3 className="font-serif font-semibold text-earth-600 mb-4">基础信息</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-earth-400">所属层级</span>
                    <span className="font-medium text-earth-600">{chainLevelMap[method.chain_level]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-400">收费对象</span>
                    <span className="font-medium text-earth-600">{method.target_audience_labels.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-400">计费单位</span>
                    <span className="font-medium text-earth-600">{method.billing_unit_labels.join(', ')}</span>
                  </div>
                  {method.price_anchor_min && method.price_anchor_max && (
                    <div className="flex justify-between">
                      <span className="text-earth-400">定价锚点</span>
                      <span className="font-medium text-earth-600">
                        {method.price_currency === 'USD' ? '$' : '¥'}
                        {method.price_anchor_min}-{method.price_anchor_max} / {method.price_unit}
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Key Metrics */}
              <Card className="p-5 border-cream-300 bg-white shadow-elegant">
                <h3 className="font-serif font-semibold text-earth-600 mb-4">关键指标</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-earth-400" />
                      <span className="text-sm text-earth-500">毛利率</span>
                    </div>
                    <Badge className={marginInfo.bgColor + ' ' + marginInfo.color}>
                      {marginInfo.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-earth-400" />
                      <span className="text-sm text-earth-500">可规模化</span>
                    </div>
                    <Badge variant="outline" className="border-cream-300 text-earth-600">
                      {scalabilityMap[method.scalability_level]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-earth-400" />
                      <span className="text-sm text-earth-500">数据依赖</span>
                    </div>
                    <Badge variant="outline" className="border-cream-300 text-earth-600">
                      {scalabilityMap[method.data_dependency_level]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-earth-400" />
                      <span className="text-sm text-earth-500">算力敏感</span>
                    </div>
                    <Badge variant="outline" className="border-cream-300 text-earth-600">
                      {scalabilityMap[method.compute_cost_sensitivity]}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Related Cases */}
              <Card className="p-5 border-cream-300 bg-white shadow-elegant">
                <h3 className="font-serif font-semibold text-earth-600 mb-4">相关案例</h3>
                <div className="space-y-3">
                  {relatedCases.slice(0, 5).map(c => (
                    <div 
                      key={c.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-cream-50 cursor-pointer transition-colors"
                      onClick={() => onNavigate('case-detail', c.slug)}
                    >
                      {c.logo_url ? (
                        <img src={c.logo_url} alt={c.name} className="w-8 h-8 rounded object-contain" />
                      ) : (
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-sage-DEFAULT to-sage-300 flex items-center justify-center text-white text-xs font-bold">
                          {c.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-earth-600 truncate">{c.name}</p>
                        <p className="text-xs text-earth-400">{c.company_name}</p>
                      </div>
                    </div>
                  ))}
                  {relatedCases.length === 0 && (
                    <p className="text-sm text-earth-400 text-center py-4">暂无相关案例</p>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-white border border-cream-300 p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-sage-DEFAULT data-[state=active]:text-white">概览</TabsTrigger>
                <TabsTrigger value="pricing" className="data-[state=active]:bg-sage-DEFAULT data-[state=active]:text-white">定价与成本</TabsTrigger>
                <TabsTrigger value="cases" className="data-[state=active]:bg-sage-DEFAULT data-[state=active]:text-white">案例</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Definition */}
                <Card className="p-6 border-cream-300 bg-white shadow-elegant">
                  <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4">定义</h3>
                  <p className="text-earth-500 leading-relaxed">{method.definition}</p>
                </Card>

                {/* Applicable Scenarios */}
                <Card className="p-6 border-cream-300 bg-white shadow-elegant">
                  <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4">适用场景</h3>
                  <div className="flex flex-wrap gap-2">
                    {method.applicable_scenarios.map((scenario, i) => (
                      <Badge key={i} variant="secondary" className="text-sm bg-sage-100 text-sage-700">
                        {scenario}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border-cream-300 bg-white shadow-elegant">
                    <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-sage-DEFAULT" />
                      优点
                    </h3>
                    <ul className="space-y-2">
                      {method.advantages.map((adv, i) => (
                        <li key={i} className="flex items-start gap-2 text-earth-500">
                          <span className="w-1.5 h-1.5 bg-sage-DEFAULT rounded-full mt-2 flex-shrink-0" />
                          {adv}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-6 border-cream-300 bg-white shadow-elegant">
                    <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-earth-400" />
                      缺点
                    </h3>
                    <ul className="space-y-2">
                      {method.disadvantages.map((dis, i) => (
                        <li key={i} className="flex items-start gap-2 text-earth-500">
                          <span className="w-1.5 h-1.5 bg-earth-400 rounded-full mt-2 flex-shrink-0" />
                          {dis}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Risk Points */}
                <Card className="p-6 border-amber-200 bg-amber-50/50">
                  <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    风险点
                  </h3>
                  <ul className="space-y-2">
                    {method.risk_points.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2 text-earth-500">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6 mt-6">
                {/* Cost Structure */}
                {method.cost_structure && (
                  <Card className="p-6 border-cream-300 bg-white shadow-elegant">
                    <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4">成本结构</h3>
                    <div className="space-y-3">
                      {Object.entries(method.cost_structure).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-4">
                          <span className="text-sm text-earth-500 w-24 capitalize">
                            {key.replace('_', ' ')}
                          </span>
                          <div className="flex-1 h-4 bg-cream-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-sage-DEFAULT rounded-full"
                              style={{ width: `${(value as number) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-earth-600 w-12 text-right">
                            {((value as number) * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Margin Sensitivity */}
                <Card className="p-6 border-cream-300 bg-white shadow-elegant">
                  <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4">毛利敏感项</h3>
                  <div className="flex flex-wrap gap-2">
                    {method.margin_sensitivity.map((item, i) => (
                      <Badge key={i} variant="outline" className="text-sm border-cream-300 text-earth-600">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="cases" className="space-y-6 mt-6">
                {relatedCases.map(c => (
                  <Card 
                    key={c.id} 
                    className="p-6 cursor-pointer border-cream-300 hover:border-sage-DEFAULT transition-colors bg-white shadow-elegant"
                    onClick={() => onNavigate('case-detail', c.slug)}
                  >
                    <div className="flex items-start gap-4">
                      {c.logo_url ? (
                        <img src={c.logo_url} alt={c.name} className="w-12 h-12 rounded-lg object-contain" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sage-DEFAULT to-sage-300 flex items-center justify-center text-white font-bold">
                          {c.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-serif font-semibold text-earth-600">{c.name}</h4>
                        <p className="text-sm text-earth-400">{c.company_name}</p>
                        <p className="text-sm text-earth-500 mt-2">{c.short_description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-earth-400">
                          <span>{chainLevelMap[c.chain_level]}</span>
                          <span>{c.monetization_methods.length} 种变现方式</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {relatedCases.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-earth-400">暂无相关案例</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
