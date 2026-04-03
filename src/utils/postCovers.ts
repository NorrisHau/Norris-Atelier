const coverModules = import.meta.glob<string>(
  "../assets/images/post-covers/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  }
);

const normalizeSlug = (value: string) => value.trim().toLowerCase();

const coverBySlug = new Map<string, string>(
  Object.entries(coverModules).map(([modulePath, resolvedPath]) => {
    const fileName = modulePath.split("/").pop() ?? "";
    const slug = normalizeSlug(fileName.replace(/\.[^/.]+$/, ""));
    return [slug, resolvedPath];
  })
);

export function getPostCoverBySlug(slug: string): string | undefined {
  return coverBySlug.get(normalizeSlug(slug));
}

export function getResolvedPostCover(
  slug: string,
  explicitCover?: string
): string | undefined {
  return explicitCover ?? getPostCoverBySlug(slug);
}
