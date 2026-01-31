import { useState } from 'react';
import { User, Code, Briefcase, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PathSelectorSectionProps {
  onNavigate: (page: string, id?: string) => void;
}

const personas = [
  {
    id: 'beginner',
    title: '普通小白',
    description: '没有技术背景，想从AI变现入门',
    icon: User,
    recommendation: 'AI自媒体（视频/图片）',
    path: '从内容创作入手，积累流量，通过带货或广告变现',
    firstStep: '选择擅长的内容形式（视频/图文）',
    tools: ['Midjourney', 'HeyGen', 'ChatGPT'],
    color: 'sage',
  },
  {
    id: 'expert',
    title: '行业专家',
    description: '有特定行业背景和经验',
    icon: Briefcase,
    recommendation: 'AI+行业咨询',
    path: '将AI引入熟悉的领域，解决具体问题',
    firstStep: '梳理行业痛点，设计AI解决方案',
    tools: ['Claude', 'GPT-4', '垂直领域工具'],
    color: 'sky',
  },
  {
    id: 'developer',
    title: '技术大牛',
    description: '有开发能力，追求产品化收入',
    icon: Code,
    recommendation: 'AI Agent开发 / 垂直SaaS',
    path: '开发智能体或垂直领域工具，追求被动收入',
    firstStep: '选择细分场景，验证需求',
    tools: ['OpenAI API', 'LangChain', 'Dify'],
    color: 'earth',
  },
  {
    id: 'enterprise',
    title: '企业决策者',
    description: '希望为企业引入AI能力',
    icon: Building2,
    recommendation: '企业级AI解决方案',
    path: '从工具到员工，改变企业成本结构',
    firstStep: '评估业务场景，选择试点部门',
    tools: ['私有化部署', 'Agent集群', '效果付费'],
    color: 'gold',
  },
];

const colorMap: Record<string, { bg: string; icon: string; border: string; btn: string }> = {
  sage: { 
    bg: 'bg-sage-50', 
    icon: 'text-sage-DEFAULT', 
    border: 'border-sage-200',
    btn: 'bg-sage-DEFAULT hover:bg-sage-dark'
  },
  sky: { 
    bg: 'bg-sky-50', 
    icon: 'text-sky-DEFAULT', 
    border: 'border-sky-200',
    btn: 'bg-sky-DEFAULT hover:bg-sky-dark'
  },
  earth: { 
    bg: 'bg-earth-50', 
    icon: 'text-earth-DEFAULT', 
    border: 'border-earth-200',
    btn: 'bg-earth-DEFAULT hover:bg-earth-dark'
  },
  gold: { 
    bg: 'bg-amber-50', 
    icon: 'text-amber-600', 
    border: 'border-amber-200',
    btn: 'bg-amber-600 hover:bg-amber-700'
  },
};

export function PathSelectorSection({ onNavigate }: PathSelectorSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPersona = personas.find(p => p.id === selectedId);

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-4">
            路径选择器
          </span>
          <h2 className="section-title mb-4">如何选择适合你的变现路径？</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            根据你的背景和优势，找到最适合的切入点
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Persona Selection */}
          <div className="space-y-4">
            {personas.map((persona) => {
              const Icon = persona.icon;
              const colors = colorMap[persona.color];
              const isSelected = selectedId === persona.id;

              return (
                <Card
                  key={persona.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? `border-2 ${colors.border} shadow-elegant` 
                      : 'border border-cream-300 hover:border-sage-300 hover:shadow-elegant'
                  }`}
                  onClick={() => setSelectedId(persona.id)}
                >
                  <div className="p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center ${isSelected ? colors.icon : 'text-earth-400'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold text-earth-600">{persona.title}</h3>
                      <p className="text-sm text-earth-400">{persona.description}</p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-sage-DEFAULT" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Recommendation Panel */}
          <div className="relative">
            <Card className="h-full border-cream-300 bg-gradient-to-br from-cream-50 to-white">
              {selectedPersona ? (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-lg ${colorMap[selectedPersona.color].bg} flex items-center justify-center`}>
                      <selectedPersona.icon className={`w-5 h-5 ${colorMap[selectedPersona.color].icon}`} />
                    </div>
                    <div>
                      <span className="text-sm text-earth-400">为你推荐</span>
                      <h3 className="text-xl font-serif font-semibold text-earth-600">{selectedPersona.recommendation}</h3>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-semibold text-earth-400 uppercase tracking-wider">变现路径</span>
                      <p className="text-earth-600 mt-1">{selectedPersona.path}</p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-earth-400 uppercase tracking-wider">第一步</span>
                      <p className="text-earth-600 mt-1">{selectedPersona.firstStep}</p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-earth-400 uppercase tracking-wider">推荐工具</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedPersona.tools.map((tool, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 rounded-full text-sm bg-sage-100 text-sage-700"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className={`w-full ${colorMap[selectedPersona.color].btn} text-white mt-4 group`}
                      onClick={() => onNavigate('canvas')}
                    >
                      生成详细方案
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-earth-300" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-earth-500 mb-2">选择你的身份</h3>
                  <p className="text-earth-400 text-sm max-w-xs">
                    点击左侧选项，获取个性化的变现路径推荐
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Core Wisdom */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="p-8 border-sage-200 bg-sage-50/50">
            <div className="text-center">
              <span className="text-sm font-semibold text-sage-600 uppercase tracking-wider">核心箴言</span>
              <blockquote className="mt-4 text-xl sm:text-2xl font-serif font-medium text-earth-600 leading-relaxed">
                "在AI时代，<span className="text-sage-DEFAULT">发现问题的能力</span>远比<span className="text-sky-DEFAULT">解决问题的能力</span>更值钱。"
              </blockquote>
              <p className="mt-4 text-earth-400">
                找到那个被AI忽略的细分痛点，就是你变现的起点
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
