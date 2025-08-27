// Travel App Navigation System
class TravelAppNavigation {
    constructor() {
        this.currentPage = 'travel_home_1.html';
        this.history = ['travel_home_1.html'];
        this.historyIndex = 0;
        this.pages = {
            'home': 'travel_home_1.html',
            'search': 'travel_search_2.html', 
            'destination': 'travel_destination_3.html',
            'planning': 'travel_planning_4.html',
            'hotel': 'travel_hotel_5.html',
            'transport': 'travel_transport_6.html',
            'food': 'travel_food_7.html',
            'guides': 'travel_guides_8.html',
            'orders': 'travel_orders_9.html',
            'profile': 'travel_profile_10.html'
        };
        this.isNavigating = false;
        this.init();
    }

    init() {
        // 获取当前页面
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        if (currentFile && currentFile.includes('travel_')) {
            this.currentPage = currentFile;
        }
        
        // 初始化导航事件
        this.setupNavigation();
        this.setupBackButton();
        this.updateActiveNav();
    }

    setupNavigation() {
        // 底部导航栏点击事件
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                if (href && href !== '#') {
                    this.navigateTo(href);
                } else {
                    // 根据图标判断导航目标
                    const icon = item.querySelector('i');
                    if (icon) {
                        const iconName = icon.getAttribute('data-lucide');
                        this.navigateByIcon(iconName);
                    }
                }
            });
        });

        // 其他导航链接
        document.querySelectorAll('[data-navigate]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const target = element.getAttribute('data-navigate');
                this.navigateTo(this.pages[target] || target);
            });
        });
    }

    setupBackButton() {
        // 返回按钮事件
        document.querySelectorAll('[data-lucide="arrow-left"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.goBack();
            });
        });

        // 浏览器返回按钮支持
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.currentPage = e.state.page;
                this.loadPage(this.currentPage, false);
            }
        });
    }

    navigateByIcon(iconName) {
        const iconPageMap = {
            'home': 'home',
            'search': 'search',
            'map-pin': 'destination',
            'wallet': 'orders',
            'user': 'profile'
        };
        
        const pageKey = iconPageMap[iconName];
        if (pageKey) {
            this.navigateTo(this.pages[pageKey]);
        }
    }

    navigateTo(page, addToHistory = true) {
        if (page === this.currentPage || this.isNavigating) return;
        
        this.isNavigating = true;
        
        if (addToHistory) {
            this.historyIndex++;
            this.history = this.history.slice(0, this.historyIndex);
            this.history.push(page);
        }
        
        this.currentPage = page;
        this.loadPage(page, addToHistory);
    }

    loadPage(page, addToHistory = true) {
        // 添加页面切换动画
        const container = document.querySelector('.mobile-container');
        if (container) {
            container.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            container.style.transform = 'translateX(-20px)';
            container.style.opacity = '0.7';
        }
        
        setTimeout(() => {
            window.location.href = page;
            if (addToHistory) {
                history.pushState({page: page}, '', page);
            }
        }, 200);
    }

    goBack() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            const previousPage = this.history[this.historyIndex];
            this.navigateTo(previousPage, false);
        } else {
            // 如果没有历史记录，返回首页
            this.navigateTo(this.pages.home);
        }
    }

    goForward() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            const nextPage = this.history[this.historyIndex];
            this.navigateTo(nextPage, false);
        }
    }

    updateActiveNav() {
        // 更新底部导航栏活跃状态
        const pageIconMap = {
            'travel_home_1.html': 'home',
            'travel_search_2.html': 'search', 
            'travel_destination_3.html': 'map-pin',
            'travel_orders_9.html': 'wallet',
            'travel_profile_10.html': 'user'
        };
        
        const activeIcon = pageIconMap[this.currentPage];
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            const icon = item.querySelector('i');
            if (icon && icon.getAttribute('data-lucide') === activeIcon) {
                item.classList.add('active');
            }
        });
    }
}

// 页面加载完成后初始化导航
document.addEventListener('DOMContentLoaded', () => {
    window.travelNav = new TravelAppNavigation();
});

// 页面切换动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 50);
});
// 
添加触摸手势支持
class TouchGestureHandler {
    constructor(navigation) {
        this.nav = navigation;
        this.startX = 0;
        this.startY = 0;
        this.threshold = 50;
        this.init();
    }

    init() {
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), {passive: true});
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), {passive: true});
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
    }

    handleTouchEnd(e) {
        if (!this.startX || !this.startY) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = this.startX - endX;
        const diffY = this.startY - endY;

        // 水平滑动且距离足够
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > this.threshold) {
            if (diffX > 0) {
                // 向左滑动 - 前进
                this.nav.goForward();
            } else {
                // 向右滑动 - 后退
                this.nav.goBack();
            }
        }

        this.startX = 0;
        this.startY = 0;
    }
}

// 页面加载完成后初始化手势支持
document.addEventListener('DOMContentLoaded', () => {
    if (window.travelNav) {
        new TouchGestureHandler(window.travelNav);
    }
});

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    if (!window.travelNav) return;
    
    switch(e.key) {
        case 'ArrowLeft':
        case 'Backspace':
            e.preventDefault();
            window.travelNav.goBack();
            break;
        case 'ArrowRight':
            e.preventDefault();
            window.travelNav.goForward();
            break;
        case '1':
            window.travelNav.navigateTo(window.travelNav.pages.home);
            break;
        case '2':
            window.travelNav.navigateTo(window.travelNav.pages.search);
            break;
        case '3':
            window.travelNav.navigateTo(window.travelNav.pages.destination);
            break;
        case '4':
            window.travelNav.navigateTo(window.travelNav.pages.orders);
            break;
        case '5':
            window.travelNav.navigateTo(window.travelNav.pages.profile);
            break;
    }
});

// 添加页面可见性检测
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && window.travelNav) {
        window.travelNav.updateActiveNav();
    }
});