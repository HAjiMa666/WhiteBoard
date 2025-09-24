import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import type { Shape } from '@/types/whiteboard.type'
import { isPointInShape } from '@utils/tools'

interface Point {
  x: number
  y: number
}

const WhiteboardCanvas = memo(() => {
  const [isDragging, setIsDragging] = useState(false)
  const [shapes, setShapes] = useState<Shape[]>([])
  const [currentShape, setCurrentShape] = useState<{
    start: Point
    end: Point
  } | null>(null)
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 绘制所有线条
  const drawLines = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // 绘制已完成的线条
    shapes.forEach((line) => {
      ctx.beginPath()
      ctx.moveTo(line.start.x, line.start.y)
      ctx.lineTo(line.end.x, line.end.y)
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // 绘制当前预览线条
    if (currentShape) {
      ctx.beginPath()
      ctx.moveTo(currentShape.start.x, currentShape.start.y)
      ctx.lineTo(currentShape.end.x, currentShape.end.y)
      ctx.strokeStyle = '#ff6b6b'
      ctx.lineWidth = 2
      ctx.setLineDash([2, 20])
      ctx.stroke()
      ctx.setLineDash([])
    }
  }

  // 绘制所有线条
  const drawRectangles = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // 绘制已完成的图形
    shapes.forEach((shape) => {
      ctx.beginPath()
      ctx.rect(shape.x, shape.y, shape.width, shape.height)
      ctx.strokeStyle = shape.color
      ctx.lineWidth = 2
      ctx.stroke()

      if (shape.id === selectedShapeId) {
        ctx.strokeStyle = 'cyan'
        ctx.lineWidth = 2
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
      }
    })

    // 绘制当前操作的图形
    if (currentShape) {
      ctx.beginPath()
      ctx.moveTo(currentShape.start.x, currentShape.start.y)
      ctx.rect(
        currentShape.start.x,
        currentShape.start.y,
        currentShape.end.x - currentShape.start.x,
        currentShape.end.y - currentShape.start.y
      )
      ctx.strokeStyle = '#ff6b6b'
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // drawLines(ctx)
    drawRectangles(ctx)

    console.log('shapes', shapes)
  }, [shapes, currentShape, selectedShapeId])

  const getRelativePosition = (e: React.MouseEvent): Point => {
    const rect = canvasRef.current?.getBoundingClientRect() // 获取 canvas 相对于视窗的位置
    if (!rect) return { x: 0, y: 0 }

    return {
      x: e.clientX - rect.left, // 计算相对位置 鼠标左侧距离视窗的左侧距离减去 canvas 左侧距离视窗左侧的距离就能计算出鼠标在画布中的距离
      y: e.clientY - rect.top, // 计算相对位置
    }
  }

  return (
    <canvas
      onMouseDown={(e) => {
        const { offsetX, offsetY, clientX, clientY } = e.nativeEvent
        console.log('各种鼠标坐标', offsetX, offsetY, clientX, clientY)
        let clickedShape = null
        for (let i = shapes.length - 1; i >= 0; i--) {
          if (isPointInShape(offsetX, offsetY, shapes[i])) {
            clickedShape = shapes[i]
            break
          }
        }
        if (clickedShape) {
          console.log('在图形内')
          setSelectedShapeId(clickedShape.id)
        } else {
          setSelectedShapeId(null)
          setIsDragging(true)
          const pos = getRelativePosition(e)
          setCurrentShape({ start: pos, end: pos })
        }
      }}
      onMouseMove={(e) => {
        if (!isDragging || !currentShape) return

        const pos = getRelativePosition(e)
        setCurrentShape((prev) => (prev ? { ...prev, end: pos } : null))
      }}
      onMouseUp={(e) => {
        if (currentShape) {
          setShapes((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: 'rect',
              x: currentShape.start.x,
              y: currentShape.start.y,
              width: currentShape.end.x - currentShape.start.x,
              height: currentShape.end.y - currentShape.start.y,
              color: '#ff6b6b',
            },
          ])
        }
        setIsDragging(false)
        setCurrentShape(null)
      }}
      ref={canvasRef}
      width={window.innerWidth - 200}
      height={3000 - 50}
      style={{ border: '1px solid black', cursor: 'crosshair' }}
    />
  )
})

export default WhiteboardCanvas
