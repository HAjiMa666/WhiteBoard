// src/App.tsx
import './App.css'
import WhiteboardCanvas from '@components/WhiteboardCanvas.tsx'

function App() {
  return (
    <div className="bg-white flex flex-col h-screen overflow-hidden">
      <header className="toolbar bg-primary text-white p-4 shadow-lg text-center h-24">
        <h1 className="text-2xl font-bold">在线协作白板</h1>
      </header>

      <main className="flex flex-1">
        <aside className="sidebar bg-gray-50 p-4 w-64  box-border">
          <p className="font-semibold mb-4 text-black">图形工具</p>

          {/* 侧边栏也可以添加一些 DaisyUI 风格的按钮 */}
          <div className="space-y-2 ">
            <button className="btn btn-neutral btn-sm w-full justify-start ">
              📐 矩形
            </button>
            <button className="btn btn-neutral btn-sm w-full justify-start">
              ⭕️ 圆形
            </button>
            <button className="btn btn-neutral btn-sm w-full justify-start">
              ✏️ 画笔
            </button>
          </div>
        </aside>

        <section className="canvas-container flex-1">
          <WhiteboardCanvas />
        </section>
      </main>
    </div>
  )
}

export default App
