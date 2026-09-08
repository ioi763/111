// 定義專案資料介面
interface Project {
  id: number;
  title: string;
  category: 'brand' | 'video' | 'web';
  year: string;
  description: string;
  image: string;
}

// 模擬大學四年的專案與作業成果資料
const projectsData: Project[] = [
  {
    id: 1,
    title: "New Balance 品牌受眾轉型與溝通策略分析",
    category: "brand",
    year: "大三 · 品牌專題研究",
    description: "探討品牌如何擺脫傳統形象並結合流行文化進行市場切入與視覺溝通。",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "流行文化跨國傳播與娛樂產業企劃短片",
    category: "video",
    year: "大二 · 影音製作與實務",
    description: "負責前期腳本設計與後期剪輯，呈現數位媒體在文化輸出中的關鍵角色。",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "資訊傳播學系成果展互動網頁設計",
    category: "web",
    year: "大四 · 畢業專題作業",
    description: "運用 HTML/SCSS 及 TypeScript 打造高響應式的成果展示平台與數位歷程。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
  }
];

// 作品集展示應用程式
class PortfolioApp {
  private gridElement: HTMLElement;
  private filterButtons: NodeListOf<HTMLButtonElement>;

  constructor() {
    this.gridElement = document.getElementById('projects-grid')!;
    this.filterButtons = document.querySelectorAll('.filter-btn');
    
    this.init();
  }

  private init(): void {
    this.renderProjects(projectsData);
    this.bindEvents();
  }

  private renderProjects(items: Project[]): void {
    this.gridElement.innerHTML = '';
    
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div class="card-img" style="background-image: url('${item.image}')"></div>
        <div class="card-content">
          <span class="year-tag">${item.year}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `;
      this.gridElement.appendChild(card);
    });
  }

  private bindEvents(): void {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e: Event) => {
        const target = e.currentTarget as HTMLButtonElement;
        const filter = target.getAttribute('data-filter');

        // 更新按鈕狀態
        this.filterButtons.forEach(b => b.classList.remove('active'));
        target.classList.add('active');

        // 執行篩選邏輯
        if (filter === 'all') {
          this.renderProjects(projectsData);
        } else {
          const filtered = projectsData.filter(p => p.category === filter);
          this.renderProjects(filtered);
        }
      });
    });
  }
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});