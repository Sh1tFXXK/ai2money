import { Github, Twitter, Mail, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-earth-600 text-cream-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sage-DEFAULT flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-serif font-semibold text-xl text-white">
                  AI变现全景报告
                </span>
                <span className="text-cream-300 text-sm ml-2">2026</span>
              </div>
            </div>
            <p className="text-cream-200 text-sm leading-relaxed max-w-md">
              系统化沉淀AI产业链各环节的商业化路径，从个人副业到企业级解决方案，
              助力每一位探索者找到属于自己的AI变现之道。
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-earth-500 flex items-center justify-center hover:bg-sage-DEFAULT transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-earth-500 flex items-center justify-center hover:bg-sage-DEFAULT transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-earth-500 flex items-center justify-center hover:bg-sage-DEFAULT transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">探索</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('monetization')}
                  className="text-cream-200 hover:text-white transition-colors"
                >
                  变现方式库
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('map')}
                  className="text-cream-200 hover:text-white transition-colors"
                >
                  产业链地图
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('cases')}
                  className="text-cream-200 hover:text-white transition-colors"
                >
                  案例库
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('canvas')}
                  className="text-cream-200 hover:text-white transition-colors"
                >
                  方案生成器
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">资源</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-cream-200 hover:text-white transition-colors">
                  使用指南
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-white transition-colors">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-white transition-colors">
                  更新日志
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-white transition-colors">
                  联系我们
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-earth-500 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cream-300">
            2026 AI变现全景报告. 发现问题的能力，比解决问题的能力更值钱.
          </p>
          <div className="flex gap-6 text-sm text-cream-300">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
