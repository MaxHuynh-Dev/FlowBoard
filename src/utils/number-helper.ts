class NumberHelper {
  calculateRem(px: number, base = 10): string {
    const newPx = px * 1;
    const newBase = base * 1;
    return `${(newPx / newBase).toFixed(2)}rem`;
  }

  getRandomInt(min: number, max: number): number {
    const min_ = Math.ceil(min);
    const max_ = Math.floor(max);
    return Math.floor(Math.random() * (max_ - min_) + min_); // The maximum is exclusive and the minimum is inclusive
  }

  randomValueRangeInt(hash: number, minVal: number, maxVal: number): number {
    return minVal + (hash % (maxVal - minVal + 1));
  }

  convertRemToPx(px: number): number {
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    return px * rootFontSize;
  }
}

export const numberHelper = new NumberHelper();
