import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onNavigate: (page: string, id?: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-white to-sky-50" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236B9F7F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-sage-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-100/80 border border-sage-200 mb-8">
            <Sparkles className="w-4 h-4 text-sage-DEFAULT" />
            <span className="text-sm font-medium text-sage-700">2026智能体爆发元年</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-earth-600 leading-tight mb-6">
            AI变现
            <span className="text-gradient-sage">全景报告</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-earth-400 font-light max-w-2xl mx-auto mb-4 leading-relaxed">
            从个人副业到企业级商业模式
          </p>
          <p className="text-base text-earth-300 max-w-xl mx-auto mb-10 leading-relaxed">
            深入解析内容创作、技术产品、专业服务、企业解决方案四大维度，
            掌握2026年AI变现的核心路径与新兴趋势
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="border-earth-300 hover:bg-sage-dark text-white px-8 py-6 text-base rounded-xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 group"
              onClick={() => onNavigate('monetization')}
            >
              探索变现路径
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-earth-300 text-earth-600 hover:bg-cream-100 px-8 py-6 text-base rounded-xl transition-all duration-300"
              onClick={() => onNavigate('canvas')}
            >
              定制变现方案
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-8 border-t border-cream-300/50">
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-serif font-semibold text-sage-DEFAULT mb-1">4</div>
                <div className="text-sm text-earth-400">变现维度</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-serif font-semibold text-sky-DEFAULT mb-1">20+</div>
                <div className="text-sm text-earth-400">变现方式</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-serif font-semibold text-gold-DEFAULT mb-1">3</div>
                <div className="text-sm text-earth-400">新兴趋势</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-sage-300 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-sage-DEFAULT rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
