import { base, zh_CN, en, Faker } from '@faker-js/faker';

export const customFaker = new Faker({
  locale: [zh_CN, en, base],
})
