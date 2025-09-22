import { type ReactNode } from "react";
import styles from "./BackgroundGradient.module.css";

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function BackgroundGradient({
  children,
  className = "",
}: Props) {
  return (
    <div className={`${styles.root} ${className}`}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />

      <div className={styles.overlay} />
      {children}
    </div>
  );
}
