import window from "./window"

export const swinit = async (): Promise<void> => {
  if (typeof window.jm_pathToWorker === "string" && "serviceWorker" in navigator) {
    const { Workbox } = await import("workbox-window")

    const wb = new Workbox(window.jm_pathToWorker)

    wb.addEventListener("activated", ev => {
      if (ev.isUpdate) location.reload(true)
    })

    wb.register()
  }
}
