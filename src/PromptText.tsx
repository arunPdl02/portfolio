import { promptSegments } from './prompt'

export default function PromptText({ path }: { path?: string }) {
  return (
    <>
      {promptSegments(path).map((seg, i) => (
        <span key={i} className={seg.style ? `t-${seg.style}` : undefined}>
          {seg.text}
        </span>
      ))}
    </>
  )
}
