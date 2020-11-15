// 发布订阅中心，on-订阅，off-取消订阅，emit-发布订阅
interface CacheProps {
  [key: string]: Array<((data: unknown) => void)>
}

class Observer {
  private caches: CacheProps = {} // 事件中心
  /**
   *
   * @param eventName 事件名-独一无二
   * @param fn 订阅后执行的自定义行为
   */
  on(eventName: string, fn: (data?: unknown) => void) {
    this.caches[eventName] = this.caches[eventName] || []
    this.caches[eventName].push(fn)
  }

  /**
   * 发布 => 将订阅的事件进行统一执行
   * @param eventName
   * @param data
   */
  emit(eventName: string, data?: unknown) {
    if (this.caches[eventName]) {
      this.caches[eventName].forEach((fn: (data?: unknown) => void) => fn(data))
    }
  }

  off(eventName: string, fn?: (data?: unknown) => void) {
    if (this.caches[eventName]) {
      const newCaches = fn ? this.caches[eventName].filter(e => e! == fn) : []
      this.caches[eventName] = newCaches
    }
  }
}

