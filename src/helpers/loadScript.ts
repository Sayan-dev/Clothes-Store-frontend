const loadedScripts = new Map<string, Promise<boolean>>()
export async function loadScript(src: string): Promise<boolean> {
  let ret = loadedScripts.get(src)
  if (ret !== undefined) return ret
  const script = document.createElement("script")
  ret = new Promise(resolve => {
    script.onload = () => resolve(true)
    script.onerror = err => {
      console.trace(err)
      resolve(false)
    }
  })
  script.src = src
  loadedScripts.set(src, ret)
  document.body.appendChild(script)
  return ret
}
