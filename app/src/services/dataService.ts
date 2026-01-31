import type { MonetizationMethod, Case, FilterState, CanvasInput, CanvasRecommendation } from '@/types';

class DataService {
  private monetizationMethods: MonetizationMethod[] = [];
  private cases: Case[] = [];
  private initialized = false;

  async init() {
    if (this.initialized) return;
    
    try {
      const [methodsRes, casesRes] = await Promise.all([
        fetch('/data/monetization-methods.json'),
        fetch('/data/cases.json')
      ]);
      
      this.monetizationMethods = await methodsRes.json();
      this.cases = await casesRes.json();
      this.initialized = true;
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }

  // 变现方式相关
  getAllMonetizationMethods(): MonetizationMethod[] {
    return this.monetizationMethods;
  }

  getMonetizationMethodById(id: string): MonetizationMethod | undefined {
    return this.monetizationMethods.find(m => m.id === id || m.slug === id);
  }

  getFeaturedMonetizationMethods(): MonetizationMethod[] {
    return this.monetizationMethods.filter(m => m.is_featured);
  }

  filterMonetizationMethods(filters: FilterState): MonetizationMethod[] {
    return this.monetizationMethods.filter(method => {
      if (filters.chainLevel !== 'all' && method.chain_level !== filters.chainLevel) {
        return false;
      }
      if (filters.targetAudience !== 'all' && !method.target_audience.includes(filters.targetAudience)) {
        return false;
      }
      if (filters.billingUnit !== 'all' && !method.billing_unit.includes(filters.billingUnit)) {
        return false;
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = method.name.toLowerCase().includes(query);
        const matchDesc = method.short_description.toLowerCase().includes(query);
        const matchDefinition = method.definition.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchDefinition) {
          return false;
        }
      }
      return true;
    });
  }

  // 案例相关
  getAllCases(): Case[] {
    return this.cases;
  }

  getCaseById(id: string): Case | undefined {
    return this.cases.find(c => c.id === id || c.slug === id);
  }

  getFeaturedCases(): Case[] {
    return this.cases.filter(c => c.is_featured);
  }

  getCasesByMonetizationMethod(methodId: string): Case[] {
    return this.cases.filter(c => 
      c.monetization_methods.some(m => m.method_id === methodId)
    );
  }

  filterCases(filters: FilterState): Case[] {
    return this.cases.filter(c => {
      if (filters.chainLevel !== 'all' && c.chain_level !== filters.chainLevel) {
        return false;
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(query);
        const matchDesc = c.short_description.toLowerCase().includes(query);
        const matchCompany = c.company_name.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCompany) {
          return false;
        }
      }
      return true;
    });
  }

  // 获取矩阵数据
  getMatrixData() {
    const chainLevels = [
      { id: 'compute', name: '算力/云与芯片' },
      { id: 'model', name: '模型' },
      { id: 'toolchain', name: '工具链/中间件' },
      { id: 'application', name: '应用' },
      { id: 'data', name: '数据' },
      { id: 'service', name: '服务/集成' }
    ];

    const categories = [
      { id: 'api_billing', name: 'API计费' },
      { id: 'subscription', name: '订阅制' },
      { id: 'commission', name: '抽佣' },
      { id: 'project', name: '项目制' },
      { id: 'advertising', name: '广告' },
      { id: 'performance', name: '效果付费' }
    ];

    const matrix: Record<string, Record<string, { count: number; cases: Case[] }>> = {};

    chainLevels.forEach(chain => {
      matrix[chain.id] = {};
      categories.forEach(cat => {
        matrix[chain.id][cat.id] = { count: 0, cases: [] };
      });
    });

    this.cases.forEach(c => {
      c.monetization_methods.forEach(m => {
        const method = this.getMonetizationMethodById(m.method_id);
        if (method) {
          const chainId = method.chain_level;
          const catId = method.billing_unit[0];
          if (matrix[chainId] && matrix[chainId][catId]) {
            matrix[chainId][catId].count++;
            if (!matrix[chainId][catId].cases.find(existing => existing.id === c.id)) {
              matrix[chainId][catId].cases.push(c);
            }
          }
        }
      });
    });

    return { chainLevels, categories, matrix };
  }

  // 画布生成器
  generateCanvas(input: CanvasInput): CanvasRecommendation[] {
    const recommendations: CanvasRecommendation[] = [];
    
    // 基于输入生成推荐方案
    if (input.productType.includes('模型') || input.productType.includes('API')) {
      recommendations.push({
        rank: 1,
        confidence: 0.92,
        name: 'API Token 计费 + 订阅制',
        reasoning: '基于你的产品类型和成本结构，API Token 计费是模型层的行业标准变现方式，可以与订阅制组合提供稳定现金流。',
        pricing_anchor: {
          min: 0.01,
          max: 0.05,
          unit: 'per 1K tokens',
          currency: 'USD'
        },
        referenced_cases: [
          { id: 'case-001', name: 'OpenAI GPT-4', relevance: '高度相关' },
          { id: 'case-002', name: 'Claude', relevance: '高度相关' }
        ],
        mvp_path: [
          '设置免费额度 (1000 tokens/天)',
          '超出后按 $0.02/1K 计费',
          '提供 $29/月 订阅选项包含 100K tokens'
        ],
        validation_checklist: [
          '确定 Token 计量方式',
          '测试支付流程',
          '监控首月转化率'
        ],
        risk_warnings: [
          '算力成本波动可能影响毛利率',
          '需要精确的 Token 计量系统'
        ]
      });
    }

    if (input.targetCustomer === '企业' || input.targetCustomer === 'tob') {
      recommendations.push({
        rank: 2,
        confidence: 0.85,
        name: '企业版/私有化部署',
        reasoning: '面向企业客户，私有化部署可以满足数据安全和合规需求，客单价高。',
        pricing_anchor: {
          min: 10000,
          max: 100000,
          unit: 'per year',
          currency: 'USD'
        },
        referenced_cases: [
          { id: 'case-004', name: '智谱 GLM', relevance: '高度相关' }
        ],
        mvp_path: [
          '推出 SaaS 版本验证需求',
          '收集企业客户反馈',
          '推出私有化部署方案'
        ],
        validation_checklist: [
          '确认企业客户需求',
          '评估私有化部署成本',
          '建立企业销售团队'
        ],
        risk_warnings: [
          '销售周期长（3-12个月）',
          '需要专业销售团队'
        ]
      });
    }

    if (input.costStructure.includes('算力成本高')) {
      recommendations.push({
        rank: 3,
        confidence: 0.78,
        name: '用量包/预付费',
        reasoning: '预付费模式可以提前锁定收入，改善现金流，降低算力成本波动风险。',
        pricing_anchor: {
          min: 5,
          max: 10000,
          unit: 'per package',
          currency: 'USD'
        },
        referenced_cases: [
          { id: 'case-006', name: 'Runway', relevance: '中度相关' }
        ],
        mvp_path: [
          '设计多档用量包',
          '设置有效期策略',
          '提供购买优惠'
        ],
        validation_checklist: [
          '测试用户购买意愿',
          '优化用量包档位',
          '监控使用率'
        ],
        risk_warnings: [
          '用户购买后长期不使用',
          '过期争议'
        ]
      });
    }

    return recommendations;
  }

  // 获取统计数据
  getStats() {
    return {
      monetizationMethods: this.monetizationMethods.length,
      cases: this.cases.length,
      companies: new Set(this.cases.map(c => c.company_name)).size
    };
  }
}

export const dataService = new DataService();
