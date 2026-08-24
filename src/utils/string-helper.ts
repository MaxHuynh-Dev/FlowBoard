class StringHelper {
  removeAccents(str: string): string {
    /**
     * Parse a localized number to a float.
     * @param {string} stringNumber - the localized number
     * @param {string} locale - [optional] the locale that the number is represented in. Omit this parameter to use the current locale.
     */
    const AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ',
      'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ'
    ];
    let result: string = str;
    for (const accentMap of AccentsMap) {
      const re = new RegExp(`[${accentMap.substring(1)}]`, 'g');
      const char = accentMap[0];

      result = result.replace(re, char).toUpperCase();
    }
    return result;
  }

  compareString = (a: string, b: string): number => {
    return a.localeCompare(b);
  };

  spliceSlice(str: string, index: number, count: number, add: string): string {
    // We cannot pass negative indexes directly to the 2nd slicing operation.
    let safeIndex: number = index;
    if (index < 0) {
      safeIndex = str.length + index;
      if (safeIndex < 0) {
        safeIndex = 0;
      }
    }

    return `${str.slice(0, safeIndex)}${add || ''}${str.slice(safeIndex + count)}`;
  }
}

export const stringHelper = new StringHelper();
