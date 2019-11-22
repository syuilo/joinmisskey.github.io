import { IconName, IconParams, IconPrefix } from "@fortawesome/fontawesome-svg-core"
import onReady from "./onReady"

export const fainit = async (): Promise<void> => {
  const { getNode } = await import("../../../scripts/falib")
  onReady(() => {
    for (const el of Array.from(document.getElementsByTagName("i"))) {
      if (!el.hasChildNodes()) {
        try {
          const fa = getNode(
            {
              iconName: el.dataset.faIconName as IconName,
              prefix: el.dataset.faPrefix as IconPrefix
            },
            (el.dataset.faOption ? JSON.parse(el.dataset.faOption.replace(/'/g, "\"")) : {}) as IconParams
          )
          el.insertAdjacentElement("beforebegin", fa.item(0))
          el.remove()
        } catch (e) {
          console.log(`FontAwesome: ${el.dataset.faPrefix} ${el.dataset.faIconName}は見つかりませんでした。`)
          console.log(e)
        }
      }
    }
  })
}
