import { BANNER_FULL, BANNER_SMALL } from './banner'
import { content } from './content'

/** ASCII name banner; CSS swaps to the stacked variant on narrow screens. */
export default function Banner() {
  return (
    <div className="banner">
      <h1 className="sr-only">{content.profile.name}</h1>
      <pre className="banner-full" aria-hidden="true">
        {BANNER_FULL}
      </pre>
      <pre className="banner-small" aria-hidden="true">
        {BANNER_SMALL}
      </pre>
    </div>
  )
}
