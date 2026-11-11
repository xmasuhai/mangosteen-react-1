/**
 * @Description: 颜文字主题列表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-18 10:59:35
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-18 14:39:57
 * @FilePath: src/const/emojiTopicList.ts
 */
export const emojiTopicList = Object.freeze([
  {
    mainTopic: '表情',
    topics: [
      'face-smiling',
      'face-affection',
      'face-tongue',
      'face-hand',
      'face-neutral-skeptical',
      'face-sleepy',
      'face-unwell',
      'face-hat',
      'face-glasses',
      'face-concerned',
      'face-negative',
      'face-costume',
      'cat-face',
      'monkey-face',
      'heart',
      'emotion',
    ],
  },
  {
    mainTopic: '手势',
    topics: [
      'hand-fingers-open',
      'hand-fingers-partial',
      'hand-single-finger',
      'hand-fingers-closed',
      'hands',
      'hand-prop',
    ],
  },
  {
    mainTopic: '食物',
    topics: [
      'food-fruit',
      'food-vegetable',
      'food-prepared',
      'food-asian',
      'food-sweet',
      'drink',
      'dishware',
    ],
  },
  {
    mainTopic: '动物',
    topics: [
      'animal-mammal',
      'animal-bird',
      'animal-amphibian',
      'animal-reptile',
      'animal-marine',
      'animal-bug',
    ],
  },
  {
    mainTopic: '植物',
    topics: ['plant-flower', 'plant-other'],
  },
  {
    mainTopic: '自然',
    topics: ['time', 'sky & weather'],
  },
  {
    mainTopic: '人物',
    topics: [
      'person',
      'person-gesture',
      'person-fantasy',
      'person-activity',
      'person-resting',
      'family',
      'person-symbol',
    ],
  },
  {
    mainTopic: '场所',
    topics: [
      'place-map',
      'place-geographic',
      'place-building',
      'place-religious',
      'place-other',
      'hotel',
    ],
  },
  {
    mainTopic: '交通',
    topics: ['transport-ground', 'transport-water', 'transport-air', 'transport-sign', 'warning'],
  },
  {
    mainTopic: '节日',
    topics: ['event'],
  },
  {
    mainTopic: '运动',
    topics: ['person-sport', 'sport', 'award-medal'],
  },
  {
    mainTopic: '衣服',
    topics: ['clothing'],
  },
  {
    mainTopic: '文艺',
    topics: [
      'arts & crafts',
      'game',
      'music',
      'musical-instrument',
      'sound',
      'light & video',
      'book-paper',
      'writing',
    ],
  },
  {
    mainTopic: '职业',
    topics: [
      'person-role',
      'money',
      'currency',
      'phone',
      'computer',
      'mail',
      'office',
      'lock',
      'tool',
      'household',
    ],
  },
  {
    mainTopic: '科技',
    topics: ['science', 'medical', 'math'],
  },
  {
    mainTopic: '个人',
    topics: ['body-parts', 'hair-style', 'religion', 'zodiac', 'gender'],
  },
  {
    mainTopic: '其他',
    topics: [
      'other-object',
      'arrow',
      'av-symbol',
      'punctuation',
      'other-symbol',
      'alphanum',
      'flag',
    ],
  },
] as const)

export type EmojiMainTopic = (typeof emojiTopicList)[number]['mainTopic']
export type EmojiTopics = (typeof emojiTopicList)[number]['topics']
export type EmojiSubTopic = EmojiTopics[number]
