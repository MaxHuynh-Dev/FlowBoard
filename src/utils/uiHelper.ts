import { APP_ENV } from '@/constants/envs';

class UiHelper {
  shuffle(array: (string | number | HTMLElement)[]): void {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }

  pageScrollTop(): number {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  }

  debounce<T extends (...args: never[]) => never>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null;

    return (...args: Parameters<T>): void => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func.apply(this as ThisType<T>, args);
      }, delay);
    };
  }

  isProduction(): boolean {
    return APP_ENV === 'production';
  }

  isDevelopment(): boolean {
    return APP_ENV === 'development';
  }

  isClient(): boolean {
    return typeof window !== 'undefined';
  }

  isMobile(): boolean {
    if (!this.isClient()) return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
  }
}

export const uiHelper = new UiHelper();
