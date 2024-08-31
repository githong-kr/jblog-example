'use client'

import { useEffect, useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(`현재 카운트 값은 ${count}입니다.`)
  }, [count])

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
    </div>
  )
}
