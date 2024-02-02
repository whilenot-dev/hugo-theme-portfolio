// data structure for images info
export interface ImageJSON {
  index: number
  alt: string
  loUrl: string
  loImgH: number
  loImgW: number
  hiUrl: string
  hiImgH: number
  hiImgW: number
}

export async function initResources(): Promise<ImageJSON[]> {
  try {
    const response = await fetch(`${window.location.href}index.json`, {
      headers: {
        Accept: 'application/json'
      }
    })
    const data: ImageJSON[] = await response.json()
    return data.sort((a: ImageJSON, b: ImageJSON) => {
      const prioA = prioFromImage(a);
      const prioB = prioFromImage(b);

      return prioA - prioB;
    })
  } catch (_) {
    return []
  }
}

function prioFromImage(image: ImageJSON): number {
  const basename = image.loUrl.split('/').pop()!;
  const filename = basename.split('_').shift()!;
  
  return Number.parseInt(filename, 10);
}
