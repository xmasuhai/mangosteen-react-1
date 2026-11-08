export type DateTimeParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  ms: number
}
export type DateTimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'ms'
type DateTimeParams = number | string | Date

export class DateTime {
  #date: Date
  constructor(p?: DateTimeParams) {
    this.#date = p ? new Date(p) : new Date()
  }
  getTimestamp() {
    return this.#date.getTime()
  }
  // t = new DateTime(); t.parts.year;
  get parts(): DateTimeParts {
    return {
      year: this.#date.getFullYear(),
      month: this.#date.getMonth() + 1,
      day: this.#date.getDate(),
      hour: this.#date.getHours(),
      minute: this.#date.getMinutes(),
      second: this.#date.getSeconds(),
      ms: this.#date.getMilliseconds(),
    }
  }

  // p = {year: 2000, month: 10}; t.parts = p;
  set parts(p: Partial<DateTime['parts']>) {
    const table = {
      year: 'setFullYear',
      month: 'setMonth',
      day: 'setDate',
      hour: 'setHours',
      minute: 'setMinutes',
      second: 'setSeconds',
      ms: 'setMilliseconds',
    } as const
    Object.entries(p).forEach(([key, value]) => {
      const methodsName = table[key as keyof typeof table]
      value = key === 'month' ? value - 1 : value
      this.#date[methodsName](value)
    })
  }

  get year(): number {
    return this.parts.year
  }
  set year(value: number) {
    this.parts = { year: value }
  }
  get month(): number {
    return this.parts.month
  }
  set month(value: number) {
    this.parts = { month: value }
  }
  get day(): number {
    return this.parts.day
  }
  set day(value: number) {
    this.parts = { day: value }
  }
  get hour(): number {
    return this.parts.hour
  }
  set hour(value: number) {
    this.parts = { hour: value }
  }
  get minute(): number {
    return this.parts.minute
  }
  set minute(value: number) {
    this.parts = { minute: value }
  }
  get second(): number {
    return this.parts.second
  }
  set second(value: number) {
    this.parts = { second: value }
  }
  get ms(): number {
    return this.parts.ms
  }
  set ms(value: number) {
    this.parts = { ms: value }
  }

  // t.add(-10, 'year').year
  add(n: number, unit: DateTimeUnit) {
    const table = {
      year: 'year',
      month: 'month',
      day: 'day',
      hour: 'hour',
      minute: 'minute',
      second: 'second',
      ms: 'ms',
    } as const
    this[table[unit]] += n
    return this
  }
  /**
   * 格式化输出
   * https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-time-string-format
   * @pattern 目前只支持 YYYY-MM-DDTHH:mm:ss.sssZ
   * @memberof DateTime
   * @example (new DateTime()).format('YYYY-MM-DDTHH:mm:ss.sssZ') DateTime
   * @example (new DateTime()).format('YYYY年MM月DD日') DateTime
   */
  format(pattern = 'YYYY-MM-DD') {
    return pattern
      .replace(/YYYY/g, this.year.toString())
      .replace(/MM/g, this.month.toString().padStart(2, '0'))
      .replace(/DD/g, this.day.toString().padStart(2, '0'))
      .replace(/HH/g, this.hour.toString().padStart(2, '0'))
      .replace(/mm/g, this.minute.toString().padStart(2, '0'))
      .replace(/ss/g, this.second.toString().padStart(2, '0'))
      .replace(/sss/g, this.ms.toString().padStart(3, '0'))
  }
}

export const createDateTime = (p?: DateTimeParams) => new DateTime(p)
