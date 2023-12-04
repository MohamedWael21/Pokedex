const fetchImages = async (
  context: Record<string, () => Promise<unknown>>
): Promise<{ [key: string]: string }> => {
  const images: { [key: string]: string } = {};
  const cache: { [key: string]: string } = {};

  const keys: string[] = Object.keys(context);
  for (const key of keys) {
    const module: string = (await context[key]()) as string;
    cache[key] = (module as { default?: string })?.default || module;
  }

  Object.entries(cache).forEach(([moduleKey, module]) => {
    const keyArr: string[] = moduleKey.split("/");
    const key: string = keyArr[keyArr.length - 1];
    images[key.split(".")[0]] = module;
  });

  return images;
};

export const images: { [key: string]: string } = await fetchImages(
  import.meta.glob("../assets/pokemons/shiny/*.png")
);

export const defaultImages: { [key: string]: string } = await fetchImages(
  import.meta.glob("../assets/pokemons/default/*.png")
);
