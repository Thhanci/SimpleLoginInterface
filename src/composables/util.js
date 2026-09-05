import { ElNotification, ElMessageBox } from 'element-plus'
import nProgress from 'nprogress'

//轻提示/消息提示  toast 这个词本身是“吐司/烤面包”的意思，在编程里借用这个词，是因为提示消息像吐司机弹出面包一样“弹出来”。
export function toast(message,type="success",dangerousUseHTMLString=false,duration=3000){
    ElNotification({
        message,
        type,
        dangerousUseHTMLString,
        duration
    })
}

export function showModal(content="提示内容",type="warning",title=""){
    return ElMessageBox.confirm(
    content,//'proxy will permanently delete the file. Continue?',
    title,//'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,//type: 'warning',
    }
  )
}

//显示全局loading
export function showFullLoading(){
  nProgress.start()
}

//隐藏全局loading
export function hideFullLoading(){
  nProgress.done()
}