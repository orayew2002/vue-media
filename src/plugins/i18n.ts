import { createI18n } from 'vue-i18n'
import tk from '@/lang/tk'
import ru from '@/lang/ru'

const i18nInstance = createI18n({
  locale: 'tk',
  fallbackLocale: 'tk',
  messages: {
    tk,
    ru,
  },
})
export default i18nInstance
