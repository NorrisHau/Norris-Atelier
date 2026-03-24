import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort((a, b) => {
      const chapterA = a.data.chapter;
      const chapterB = b.data.chapter;

      if (chapterA !== undefined && chapterB !== undefined) {
        return chapterA - chapterB;
      }

      if (chapterA !== undefined) {
        return -1;
      }

      if (chapterB !== undefined) {
        return 1;
      }

      return (
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
      );
    });
};

export default getSortedPosts;
