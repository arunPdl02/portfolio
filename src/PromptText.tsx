import { promptSegments, shortPromptSegments } from './prompt'

export default function PromptText({ path, short }: { path?: string; short?: boolean }) {
  const segments = short ? shortPromptSegments(path) : promptSegments(path)
  return (
    <>
      {segments.map((seg, i) => (
        <span key={i} className={seg.style ? `t-${seg.style}` : undefined}>
          {seg.text}
        </span>
      ))}
    </>
  )
}
