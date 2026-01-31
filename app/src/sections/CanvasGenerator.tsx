import { useState } from 'react';
import { ArrowRight, RefreshCw, CheckCircle2, AlertTriangle, Lightbulb, TrendingUp, DollarSign, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { dataService } from '@/services/dataService';
import type { CanvasRecommendation } from '@/types';

const productTypes = [
  { value: 'llm', label: '大语言模型' },
  { value: 'image_gen', label: '图像生成' },
  { value: 'video_gen', label: '视频生成' },
  { value: 'code_assistant', label: '代码助手' },
  { value: 'writing_assistant', label: '写作助手' },
  { value: 'data_platform', label: '数据平台' },
  { value: 'gpu_cloud', label: 'GPU 云服务' },
  { value: 'ai_solution', label: 'AI 解决方案' },
];

const targetCustomers = [
  { value: 'enterprise', label: '企业客户 (ToB)' },
  { value: 'consumer', label: '消费者 (ToC)' },
  { value: 'developer', label: '开发者 (ToD)' },
  { value: 'government', label: '政府/机构' },
];

const valuePropositions = [
  { value: 'cost_reduction', label: '降本' },
  { value: 'revenue_growth', label: '增收' },
  { value: 'efficiency', label: '提效' },
  { value: 'compliance', label: '合规' },
];

const costStructures = [
  { value: 'compute', label: '算力成本高' },
  { value: 'rd', label: '研发成本高' },
  { value: 'data', label: '数据获取成本高' },
  { value: 'operations', label: '运营成本高' },
];

export function CanvasGenerator() {
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [formData, setFormData] = useState({
    productType: '',
    targetCustomer: '',
    valuePropositions: [] as string[],
    costStructure: [] as string[],
    description: '',
  });
  const [recommendations, setRecommendations] = useState<CanvasRecommendation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleValueProp = (value: string) => {
    setFormData(prev => ({
      ...prev,
      valuePropositions: prev.valuePropositions.includes(value)
        ? prev.valuePropositions.filter(v => v !== value)
        : [...prev.valuePropositions, value]
    }));
  };

  const toggleCostStructure = (value: string) => {
    setFormData(prev => ({
      ...prev,
      costStructure: prev.costStructure.includes(value)
        ? prev.costStructure.filter(v => v !== value)
        : [...prev.costStructure, value]
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = dataService.generateCanvas({
      productType: formData.productType,
      targetCustomer: formData.targetCustomer,
      valuePropositions: formData.valuePropositions,
      costStructure: formData.costStructure,
      description: formData.description,
    });
    
    setRecommendations(result);
    setIsGenerating(false);
    setStep('result');
  };

  const canGenerate = 
    formData.productType && 
    formData.targetCustomer && 
    formData.valuePropositions.length > 0 &&
    formData.costStructure.length > 0;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-cream-300">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-serif font-semibold text-earth-600">变现画布生成器</h1>
          <p className="text-earth-400 text-sm mt-1">
            输入你的产品信息，获取定制化变现方案
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {step === 'input' ? (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-cream-300 bg-white shadow-elegant">
              <div className="space-y-8">
                {/* Product Type */}
                <div>
                  <Label className="text-base font-serif font-semibold text-earth-600 mb-3 block">
                    1. 产品类型 <span className="text-sage-DEFAULT">*</span>
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {productTypes.map(type => (
                      <button
                        key={type.value}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.productType === type.value
                            ? 'border-sage-DEFAULT bg-sage-50 text-sage-700'
                            : 'border-cream-300 text-earth-500 hover:border-sage-300 hover:bg-cream-50'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, productType: type.value }))}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Customer */}
                <div>
                  <Label className="text-base font-serif font-semibold text-earth-600 mb-3 block">
                    2. 目标客户 <span className="text-sage-DEFAULT">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {targetCustomers.map(customer => (
                      <button
                        key={customer.value}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.targetCustomer === customer.value
                            ? 'border-sage-DEFAULT bg-sage-50 text-sage-700'
                            : 'border-cream-300 text-earth-500 hover:border-sage-300 hover:bg-cream-50'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, targetCustomer: customer.value }))}
                      >
                        {customer.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Value Propositions */}
                <div>
                  <Label className="text-base font-serif font-semibold text-earth-600 mb-3 block">
                    3. 价值点 <span className="text-sage-DEFAULT">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {valuePropositions.map(prop => (
                      <div key={prop.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`prop-${prop.value}`}
                          checked={formData.valuePropositions.includes(prop.value)}
                          onCheckedChange={() => toggleValueProp(prop.value)}
                        />
                        <Label 
                          htmlFor={`prop-${prop.value}`}
                          className="text-sm text-earth-500 cursor-pointer"
                        >
                          {prop.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost Structure */}
                <div>
                  <Label className="text-base font-serif font-semibold text-earth-600 mb-3 block">
                    4. 成本结构 <span className="text-sage-DEFAULT">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {costStructures.map(cost => (
                      <div key={cost.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`cost-${cost.value}`}
                          checked={formData.costStructure.includes(cost.value)}
                          onCheckedChange={() => toggleCostStructure(cost.value)}
                        />
                        <Label 
                          htmlFor={`cost-${cost.value}`}
                          className="text-sm text-earth-500 cursor-pointer"
                        >
                          {cost.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label className="text-base font-serif font-semibold text-earth-600 mb-3 block">
                    5. 补充描述（可选）
                  </Label>
                  <Textarea
                    placeholder="请简要描述你的产品..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[100px] border-cream-300 focus:border-sage-DEFAULT"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  className="w-full py-6 text-base bg-sage-DEFAULT hover:bg-sage-dark text-white rounded-xl"
                  disabled={!canGenerate || isGenerating}
                  onClick={handleGenerate}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      生成变现方案
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-sage-DEFAULT" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-semibold text-earth-600">
                  基于你的输入，我们推荐以下变现组合
                </h2>
                <p className="text-earth-400">
                  共生成 {recommendations.length} 个方案，按匹配度排序
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <Card key={index} className="p-6 border-cream-300 bg-white shadow-elegant">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-sage-DEFAULT text-white">
                          方案 {rec.rank}
                        </Badge>
                        <Badge variant="outline" className="border-cream-300 text-earth-500">
                          置信度: {(rec.confidence * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-earth-600">{rec.name}</h3>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-earth-500 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-sage-DEFAULT" />
                      推荐原因
                    </h4>
                    <p className="text-earth-500 bg-cream-50 p-4 rounded-lg">
                      {rec.reasoning}
                    </p>
                  </div>

                  {/* Pricing Anchor */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-earth-500 mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-sage-DEFAULT" />
                      定价锚点
                    </h4>
                    <div className="bg-sage-50 p-4 rounded-lg">
                      <p className="text-lg font-semibold text-sage-700">
                        {rec.pricing_anchor.currency === 'USD' ? '$' : '¥'}
                        {rec.pricing_anchor.min}-{rec.pricing_anchor.max} / {rec.pricing_anchor.unit}
                      </p>
                    </div>
                  </div>

                  {/* Referenced Cases */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-earth-500 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-sage-DEFAULT" />
                      参考案例
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.referenced_cases.map((c, i) => (
                        <Badge key={i} variant="secondary" className="bg-cream-100 text-earth-600">
                          {c.name} ({c.relevance})
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* MVP Path */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-earth-500 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-sage-DEFAULT" />
                      MVP 首月收费路径
                    </h4>
                    <ol className="space-y-2">
                      {rec.mvp_path.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-sage-100 text-sage-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-earth-500">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Validation Checklist */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-earth-500 mb-2">
                      验证清单
                    </h4>
                    <div className="space-y-2">
                      {rec.validation_checklist.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox id={`check-${index}-${i}`} />
                          <Label htmlFor={`check-${index}-${i}`} className="text-sm text-earth-500 cursor-pointer">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk Warnings */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      风险提示
                    </h4>
                    <ul className="space-y-1">
                      {rec.risk_warnings.map((risk, i) => (
                        <li key={i} className="text-sm text-amber-600 flex items-start gap-2">
                          <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <Button variant="outline" onClick={() => setStep('input')} className="border-cream-300 text-earth-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                重新生成
              </Button>
              <Button variant="outline" className="border-cream-300 text-earth-600">
                导出方案
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
