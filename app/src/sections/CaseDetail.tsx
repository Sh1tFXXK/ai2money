import { useState } from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  MapPin,
  Calendar,
  Building2,
  Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dataService } from '@/services/dataService';

interface CaseDetailProps {
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

const companyTypeMap: Record<string, string> = {
  'public': '上市公司',
  'unicorn': '独角兽',
  'startup': '初创公司',
  'enterprise': '大型企业',
};

export function CaseDetail({ id, onNavigate }: CaseDetailProps) {
  const caseItem = dataService.getCaseById(id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!caseItem) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-earth-400 mb-4">未找到该案例</p>
          <Button onClick={() => onNavigate('cases')} className="bg-sage-DEFAULT hover:bg-sage-dark">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回列表
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

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-cream-300">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4 text-earth-500 hover:text-earth-600"
            onClick={() => onNavigate('cases')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回列表
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo */}
            {caseItem.logo_url ? (
              <img 
                src={caseItem.logo_url} 
                alt={caseItem.name}
                className="w-20 h-20 rounded-xl object-contain bg-white border border-cream-300 p-2 shadow-elegant"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-sage-DEFAULT to-sage-300 flex items-center justify-center text-white text-2xl font-serif font-bold">
                {caseItem.name.charAt(0)}
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="bg-cream-100 text-earth-600">
                  {chainLevelMap[caseItem.chain_level]}
                </Badge>
                <Badge variant="outline" className="border-cream-300 text-earth-500">
                  {companyTypeMap[caseItem.company_type]}
                </Badge>
                {caseItem.monetization_methods.map((m, i) => (
                  <Badge key={i} className={m.is_primary ? 'bg-sage-DEFAULT text-white' : 'bg-sage-100 text-sage-700'}>
                    {m.name}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-serif font-semibold text-earth-600">{caseItem.name}</h1>
              <p className="text-earth-400 mt-1">{caseItem.company_name}</p>
              <p className="text-earth-500 mt-3 max-w-2xl">{caseItem.short_description}</p>
              
              <div className="flex items-center gap-6 mt-4 text-sm text-earth-400">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {caseItem.view_count} 浏览
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {caseItem.like_count} 点赞
                </div>
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
              {/* Company Info */}
              <Card className="p-5 border-cream-300 bg-white shadow-elegant">
                <h3 className="font-serif font-semibold text-earth-600 mb-4">公司信息</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-earth-400" />
                    <span className="text-earth-500">{caseItem.headquarters}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-earth-400" />
                    <span className="text-earth-500">成立于 {caseItem.founded_year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-earth-400" />
                    <span className="text-earth-500">{caseItem.employee_count_range} 员工</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users2 className="w-4 h-4 text-earth-400" />
                    <span className="text-earth-500">{caseItem.user_count} 用户</span>
                  </div>
                </div>
              </Card>

              {/* Financial Data */}
              <Card className="p-5 border-cream-300 bg-white shadow-elegant">
                <h3 className="font-serif font-semibold text-earth-600 mb-4">财务数据</h3>
                <div className="space-y-3 text-sm">
                  {caseItem.valuation_amount && (
                    <div className="flex justify-between">
                      <span className="text-earth-400">估值</span>
                      <span className="font-medium text-earth-600">
                        {formatCurrency(caseItem.valuation_amount, caseItem.valuation_currency)}
                      </span>
                    </div>
                  )}
                  {caseItem.annual_revenue && (
                    <div className="flex justify-between">
                      <span className="text-earth-400">年收入</span>
                      <span className="font-medium text-earth-600">
                        {formatCurrency(caseItem.annual_revenue, caseItem.revenue_currency)}
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Competitors */}
              <Card className="p-5 border-cream-300 bg-white shadow-elegant">
                <h3 className="font-serif font-semibold text-earth-600 mb-4">竞品对比</h3>
                <div className="space-y-3">
                  {caseItem.competitors.map((comp, i) => (
                    <div 
                      key={i}
                      className="p-3 rounded-lg bg-cream-50 hover:bg-sage-50 cursor-pointer transition-colors"
                      onClick={() => onNavigate('case-detail', comp.id)}
                    >
                      <p className="font-medium text-earth-600">{comp.name}</p>
                      <p className="text-xs text-earth-400 mt-1">{comp.comparison}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-white border border-cream-300 p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-sage-DEFAULT data-[state=active]:text-white">概览</TabsTrigger>
                <TabsTrigger value="pricing" className="data-[state=active]:bg-sage-DEFAULT data-[state=active]:text-white">变现详情</TabsTrigger>
                <TabsTrigger value="growth" className="data-[state=active]:bg-sage-DEFAULT data-[state=active]:text-white">增长路径</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Description */}
                <Card className="p-6 border-cream-300 bg-white shadow-elegant">
                  <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4">产品描述</h3>
                  <p className="text-earth-500 leading-relaxed">{caseItem.description}</p>
                </Card>

                {/* Chain Position */}
                <Card className="p-6 border-cream-300 bg-white shadow-elegant">
                  <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4">产业链定位</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-3 h-3 bg-sage-DEFAULT rounded-full" />
                        <span className="font-medium text-earth-600">{chainLevelMap[caseItem.chain_level]}</span>
                      </div>
                      <p className="text-sm text-earth-400">{caseItem.chain_subcategory}</p>
                    </div>
                  </div>
                </Card>

                {/* Monetization Summary */}
                <Card className="p-6 border-cream-300 bg-white shadow-elegant">
                  <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4">变现方式概览</h3>
                  <div className="space-y-4">
                    {caseItem.monetization_methods.map((m, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-cream-50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-earth-600">{m.name}</h4>
                            {m.is_primary && (
                              <Badge className="bg-sage-DEFAULT text-white text-xs">主要</Badge>
                            )}
                          </div>
                          <div className="text-sm text-earth-500">
                            {Object.entries(m.pricing_details)
                              .filter(([key]) => key !== 'currency' && key !== 'unit')
                              .slice(0, 2)
                              .map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2">
                                  <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
                                  <span className="font-medium text-earth-600">
                                    {m.pricing_details.currency === 'USD' ? '$' : '¥'}{value}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onNavigate('monetization-detail', m.method_id)}
                          className="text-sage-DEFAULT hover:text-sage-dark"
                        >
                          查看详情
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6 mt-6">
                {caseItem.monetization_methods.map((m, i) => (
                  <Card key={i} className="p-6 border-cream-300 bg-white shadow-elegant">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-serif font-semibold text-earth-600">{m.name}</h3>
                        {m.is_primary && (
                          <Badge className="mt-1 bg-sage-DEFAULT text-white text-xs">主要变现方式</Badge>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate('monetization-detail', m.method_id)}
                        className="border-cream-300 text-earth-600"
                      >
                        查看详情
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-earth-500 mb-2">定价详情</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(m.pricing_details)
                            .filter(([key]) => key !== 'currency' && key !== 'unit')
                            .map(([key, value]) => (
                              <div key={key} className="p-3 bg-cream-50 rounded-lg">
                                <p className="text-xs text-earth-400 capitalize">{key.replace(/_/g, ' ')}</p>
                                <p className="font-medium text-earth-600">
                                  {m.pricing_details.currency === 'USD' ? '$' : '¥'}{value}
                                  <span className="text-sm text-earth-400 ml-1">
                                    /{m.pricing_details.unit?.replace('per ', '')}
                                  </span>
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>

                      {m.evidence_links.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-earth-500 mb-2">来源链接</h4>
                          <div className="space-y-2">
                            {m.evidence_links.map((link, j) => (
                              <a 
                                key={j}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-sage-DEFAULT hover:underline"
                              >
                                {link.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="growth" className="space-y-6 mt-6">
                <Card className="p-6 border-cream-300 bg-white shadow-elegant">
                  <h3 className="text-lg font-serif font-semibold text-earth-600 mb-4">增长路径</h3>
                  <div className="space-y-6">
                    {caseItem.growth_path.map((stage, i) => (
                      <div key={i} className="relative pl-8 pb-6 last:pb-0">
                        {/* Timeline line */}
                        {i < caseItem.growth_path.length - 1 && (
                          <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-cream-300" />
                        )}
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-sage-DEFAULT flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{i + 1}</span>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-medium text-earth-600">{stage.stage}</h4>
                            <span className="text-sm text-earth-400">{stage.period}</span>
                          </div>
                          <p className="text-earth-500">{stage.description}</p>
                          <div className="mt-2">
                            <Badge variant="outline" className="border-cream-300 text-earth-500">变现: {stage.monetization}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
