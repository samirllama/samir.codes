// components/mdx.tsx
import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { Callout } from "./Callout.tsx";
import styles from "./mdx.module.css";

export const MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className={styles.heading1} {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={styles.heading2} {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className={styles.heading3} {...props} />
  ),
  Callout: (props: any) => <Callout {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className={styles.paragraph} {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className={styles.link} {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className={styles.blockquote} {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className={styles.list} {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className={styles.orderedList} {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className={styles.listItem} {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className={styles.hr} {...props} />
  ),

  img: (props: ComponentPropsWithoutRef<typeof Image>) => (
    <div className={styles.imageWrapper}>
      <Image
        className={styles.image}
        {...props}
        width={1200}
        height={800}
        alt={props.alt || "MDX Image"}
      />
    </div>
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className={styles.tableWrapper}>
      <table className={styles.table} {...props} />
    </div>
  ),
};
