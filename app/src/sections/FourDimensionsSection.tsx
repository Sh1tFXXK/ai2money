import { useState } from 'react';
import { 
  Video, 
  Code2, 
  Briefcase, 
  Building2,
  ChevronRight,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FourDimensionsSectionProps {
  onNavigate: (page: string, id?: string) => void;
}

const dimensions = [
  {
    id: 'content',
    title: '内容创作类',
    subtitle: '低门槛 · 适合个人及自媒体',
    icon: Video,
    color: 'sage',
    description: 'AI提升产能，实现"一人即团队"',
    paths: [
      { name: 'AI视频', tools: 'Sora 2.0, Kling, HeyGen', profit: '广告分成、带货、品牌合作' },
      { name: 'AI图像', tools: 'Midjourney, Flux, SDXL', profit: '计件收费、版权出售、订阅制' },
      { name: 'AI文学', tools: 'Claude 3.5/4, GPT-5', profit: '平台稿费、会员订阅、流量收益' },
      { name: 'AI音频', tools: 'Suno V4, Udio, ElevenLabs', profit: '版权分成、定制化配音服务' },
    ],
    trend: '2026年，"AI+人格化"成为脱颖而出的关键',
    stats: { difficulty: '低', income: '中', scale: '高' }
  },
  {
    id: 'tech',
    title: '技术产品类',
    subtitle: '中高门槛 · 适合开发者及创业者',
    icon: Code2,
    color: 'sky',
    description: '构建工具或平台，解决特定痛点获取收益',
    paths: [
      { name: '垂直领域SaaS', tools: '法律/医疗/学术助手', profit: '订阅制、按用量计费' },
      { name: 'AI Agent商店', tools: 'GPT Store / Poe / Coze', profit: '平台流量分成、插件调用费' },
      { name: 'API聚合服务', tools: '中转API、模型微调', profit: '差价、私有化模型授权' },
    ],
    trend: '从通用工具向垂直领域深度渗透',
    stats: { difficulty: '中高', income: '高', scale: '中高' }
  },
  {
    id: 'service',
    title: '专业服务类',
    subtitle: '中门槛 · 适合行业专家',
    icon: Briefcase,
    color: 'earth',
    description: '将AI技术与行业经验结合，提供高附加值服务',
    paths: [
      { name: 'AI咨询与实施', tools: '企业AI化改造', profit: '项目制咨询费' },
      { name: '提示词工程培训', tools: 'Prompt Engineering', profit: '培训课程、企业内训' },
      { name: 'AI陪跑/社群', tools: '变现社群运营', profit: '会员费、知识付费' },
      { name: 'AI咨询服务', tools: '心理/职业咨询', profit: '按次/按时收费' },
    ],
    trend: '行业经验+AI能力=高溢价服务',
    stats: { difficulty: '中', income: '中高', scale: '中' }
  },
  {
    id: 'enterprise',
    title: '企业级解决方案',
    subtitle: '高门槛 · B2B核心赛道',
    icon: Building2,
    color: 'gold',
    description: '从工具到员工，改变企业成本结构',
    paths: [
      { name: '按效果付费', tools: 'Outcome-based定价', profit: '按完成任务收费' },
      { name: '智能体员工', tools: 'Agentic Workforce', profit: '成套AI员工集群订阅' },
      { name: '私有化部署', tools: '本地化AI方案', profit: '部署费+年度维护费' },
    ],
    trend: '2026年企业市场核心：从工具到员工',
    stats: { difficulty: '高', income: '极高', scale: '低' }
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; text: string }> = {
  sage: { bg: 'bg-sage-50', border: 'border-sage-200', icon: 'text-sage-DEFAULT', text: 'text-sage-700' },
  sky: { bg: 'bg-sky-50', border: 'border-sky-200', icon: 'text-sky-DEFAULT', text: 'text-sky-700' },
  earth: { bg: 'bg-earth-50', border: 'border-earth-200', icon: 'text-earth-DEFAULT', text: 'text-earth-700' },
  gold: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', text: 'text-amber-700' },
};

export function FourDimensionsSection({ onNavigate }: FourDimensionsSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream-50 to-white" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sage-100 text-sage-700 text-sm font-medium mb-4">
            四大变现维度
          </span>
          <h2 className="section-title mb-4">找到适合你的变现路径</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            从低门槛的内容创作到高价值的企业解决方案，
            不同背景的人都能找到属于自己的AI变现方式
          </p>
        </div>

        {/* Dimensions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dimensions.map((dim) => {
            const Icon = dim.icon;
            const colors = colorMap[dim.color];
            const isActive = activeId === dim.id;

            return (
              <Card 
                key={dim.id}
                className={`group cursor-pointer overflow-hidden border transition-all duration-500 ${
                  isActive 
                    ? `border-${dim.color}-300 shadow-elegant-lg` 
                    : 'border-cream-300 hover:border-sage-300 hover:shadow-elegant'
                }`}
                onClick={() => setActiveId(isActive ? null : dim.id)}
              >
                {/* Header */}
                <div className={`p-6 ${colors.bg} border-b ${colors.border}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center ${colors.icon}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-semibold text-earth-600">{dim.title}</h3>
                        <p className={`text-sm ${colors.text}`}>{dim.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-earth-400 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                  </div>
                  <p className="mt-4 text-earth-500 text-sm">{dim.description}</p>
                </div>

                {/* Expanded Content */}
                <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-[600px]' : 'max-h-0'}`}>
                  <div className="p-6 space-y-6">
                    {/* Paths */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-earth-500 uppercase tracking-wider">变现路径</h4>
                      {dim.paths.map((path, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center justify-between p-3 rounded-lg bg-cream-50 hover:bg-sage-50 transition-colors"
                        >
                          <div>
                            <span className="font-medium text-earth-600">{path.name}</span>
                            <span className="text-earth-400 text-sm ml-2">{path.tools}</span>
                          </div>
                          <span className="text-xs text-sage-600 bg-sage-100 px-2 py-1 rounded">{path.profit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Trend */}
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-100">
                      <TrendingUp className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium text-amber-700">2026关键趋势</span>
                        <p className="text-sm text-amber-600 mt-1">{dim.trend}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="px-6 py-4 border-t border-cream-200 flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-sage-DEFAULT" />
                      <span className="text-earth-500">门槛:</span>
                      <span className="font-medium text-earth-600">{dim.stats.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-sky-DEFAULT" />
                      <span className="text-earth-500">收入:</span>
                      <span className="font-medium text-earth-600">{dim.stats.income}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-earth-DEFAULT" />
                      <span className="text-earth-500">规模:</span>
                      <span className="font-medium text-earth-600">{dim.stats.scale}</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('monetization');
                    }}
                    className="text-sm text-sage-DEFAULT hover:text-sage-dark font-medium"
                  >
                    查看案例
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
