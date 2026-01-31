import { Database, Map, Briefcase, Palette, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface QuickAccessSectionProps {
  onNavigate: (page: string) => void;
}

const quickAccessItems = [
  {
    id: 'monetization',
    title: '变现方式库',
    description: '探索 AI 产业链各环节的变现模式',
    icon: Database,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'map',
    title: '产业链地图',
    description: '可视化查看产业链与变现方式矩阵',
    icon: Map,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    id: 'cases',
    title: '案例库',
    description: '学习头部公司的变现策略',
    icon: Briefcase,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'canvas',
    title: '画布生成器',
    description: '为你的产品定制变现方案',
    icon: Palette,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
  },
];

export function QuickAccessSection({ onNavigate }: QuickAccessSectionProps) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => onNavigate(item.id)}
              >
                <div className={`p-6 ${item.bgColor}`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-slate-700 group-hover:text-slate-900">
                    进入
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
