import { ShoppingCart, Smartphone, Cpu, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const trends = [
  {
    id: 'agentic-commerce',
    title: '智能体电商',
    subtitle: 'Agentic Commerce',
    icon: ShoppingCart,
    description: 'AI Agent开始代表人类进行"谈判"和"比价"，彻底改变电商交易模式',
    opportunities: [
      '开发能够自动完成购买决策的Agent',
      '为商家提供针对Agent的"SEO"服务',
      'Agent间竞价与推荐系统',
    ],
    color: 'sage',
  },
  {
    id: 'edge-ai',
    title: '端侧AI变现',
    subtitle: 'Edge AI Monetization',
    icon: Smartphone,
    description: '手机、电脑端侧算力爆发，无需联网的隐私AI应用成为新宠',
    opportunities: [
      '一次性买断的端侧AI工具',
      '端侧功能订阅服务',
      '隐私优先的本地AI应用',
    ],
    color: 'sky',
  },
  {
    id: 'ai-compute',
    title: 'AI算力租赁与优化',
    subtitle: 'AI Compute Optimization',
    icon: Cpu,
    description: '大规模Agent集群仍需大量算力，推理优化成为硬核变现路径',
    opportunities: [
      '模型量化与压缩服务',
      '算力调度与优化方案',
      '低成本高并发推理基础设施',
    ],
    color: 'gold',
  },
];

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  sage: { bg: 'bg-sage-50', icon: 'text-sage-DEFAULT', border: 'border-sage-200' },
  sky: { bg: 'bg-sky-50', icon: 'text-sky-DEFAULT', border: 'border-sky-200' },
  gold: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-200' },
};

export function Trends2026Section() {
  return (
    <section className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-sage-200 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-40 w-48 h-48 bg-sky-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4 border border-amber-200">
            2026年三大新兴趋势
          </span>
          <h2 className="section-title mb-4">把握未来变现机遇</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            技术演进催生全新商业模式，提前布局方能抢占先机
          </p>
        </div>

        {/* Trends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trends.map((trend, index) => {
            const Icon = trend.icon;
            const colors = colorMap[trend.color];

            return (
              <Card 
                key={trend.id}
                className="group relative overflow-hidden border-cream-300 hover:border-sage-300 hover:shadow-elegant-lg transition-all duration-500"
              >
                {/* Number Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center">
                  <span className="text-sm font-serif font-semibold text-earth-400">0{index + 1}</span>
                </div>

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-semibold text-earth-600 mb-1">
                    {trend.title}
                  </h3>
                  <p className="text-sm text-earth-400 mb-4">{trend.subtitle}</p>

                  {/* Description */}
                  <p className="text-earth-500 text-sm leading-relaxed mb-6">
                    {trend.description}
                  </p>

                  {/* Opportunities */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-earth-400 uppercase tracking-wider">变现机会</span>
                    {trend.opportunities.map((opp, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 text-sm text-earth-600"
                      >
                        <ArrowUpRight className="w-4 h-4 text-sage-DEFAULT flex-shrink-0" />
                        {opp}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={`h-1 w-full ${colors.bg} group-hover:bg-gradient-to-r group-hover:from-sage-DEFAULT group-hover:to-sky-DEFAULT transition-all duration-500`} />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
