import { IconName, IconParams, IconPrefix } from "@fortawesome/fontawesome-svg-core"
import { getNode } from "../../../scripts/falib"

export const fainit = async (): Promise<void> => {
  for (const el of document.querySelectorAll("i") as unknown as HTMLUnknownElement[]) {
    if (!el.hasChildNodes()) {
      try {
        const fa = getNode(
          {
            iconName: el.dataset.faIconName as IconName,
            prefix: el.dataset.faPrefix as IconPrefix
          },
          (el.dataset.faOption ? JSON.parse(el.dataset.faOption.replace(/'/g, "\"")) : {}) as IconParams
        )
        el.parentNode.replaceChild(fa.item(0), el)
      } catch (e) {
        console.log(`FontAwesome: ${el.dataset.faPrefix} ${el.dataset.faIconName}は見つかりませんでした。`)
        console.log(e)
      }
    }
  }
}
