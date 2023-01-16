export const useValidator = () => {
  return {
    required: (value: string | number) => {
      return !!value || `未入力です。`
    },
    isKanaCharacters: (value: string) => {
      return (
        !value ||
        /^[ぁ-んァ-ン一-龥]/.test(value) ||
        'カタカナでご入力ください。'
      )
    },
    isNumber: (value: string) => {
      return !value || /^\d+$/.test(value) || '数字でご入力ください。'
    },
    isLength: (min: number, max: number) => {
      return (value: string) => {
        return (
          !value ||
          (value.length <= max && value.length >= min) ||
          `は、${min} 桁〜 ${max} 桁で入力してください。`
        )
      }
    },
    isMax: (max: number) => {
      return (value: string) => {
        return (
          !value || value.length <= max || `${max}文字以下入力してください。`
        )
      }
    }
  }
}
