import { PopUp } from '@/components/ui/PopUp';
import { useId, useState, } from 'react'
import { createPortal } from 'react-dom';

// 提前在模块顶层获取引用（只会执行一次）
const portalElement = document.getElementById('portal-root')

export const usePopup = (children?: React.ReactNode) => {
  if (!portalElement) {
    // 容错处理：如果项目有 SSR（服务端渲染）或者由于特殊原因节点未加载
    throw new Error('未找到 portal-root 节点')
  }
  const [visible, setVisible] = useState(false)
  const showPopup = () => { setVisible(true) }
  const hidePopup = () => { setVisible(false) }
  const togglePopup = () => { setVisible(!visible) }
  const popup = (
  <PopUp visible={visible} onClickMask={() => hidePopup()} >
    {children}
  </PopUp>
)
  const portalPopup = createPortal(popup, portalElement, useId())

  return {
    popup,
    portalPopup,
    showPopup,
    hidePopup,
    togglePopup,
  }
}
