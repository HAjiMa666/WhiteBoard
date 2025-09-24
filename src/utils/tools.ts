import type { Shape } from '@/types/whiteboard.type'
export const isPointInShape = (
  px: number,
  py: number,
  shape: Shape
): boolean => {
  console.log('shape 尺寸', { px, py }, shape)
  // 标准化矩形的坐标和尺寸
  const shapeX = shape.width < 0 ? shape.x + shape.width : shape.x // x,y 确保要在左上角
  const shapeY = shape.height < 0 ? shape.y + shape.height : shape.y
  const shapeWidth = Math.abs(shape.width)
  const shapeHeight = Math.abs(shape.height)

  // 2. 为“线”状矩形增加一个可点击的“厚度”
  const hitThreshold = 4 // 4像素的容差范围
  const inflatedX = shapeX - hitThreshold
  const inflatedY = shapeY - hitThreshold
  const inflatedWidth = shapeWidth + hitThreshold * 2
  const inflatedHeight = shapeHeight + hitThreshold * 2

  // 3. 使用标准化的、膨胀后的区域进行检测
  return (
    px >= inflatedX &&
    px <= inflatedX + inflatedWidth &&
    py >= inflatedY &&
    py <= inflatedY + inflatedHeight
  )
}
