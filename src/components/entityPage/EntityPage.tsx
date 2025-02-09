import { Link } from "react-router-dom";
import styles from "./entityPage.module.scss";

interface EntityProps<T> {
  entity: T | null;
  titleKey: keyof T;
  fields: { label: string; key: keyof T; isLink?: boolean }[];
}

const EntityPage = <T,>({ entity, titleKey, fields }: EntityProps<T>) => {
  if (!entity) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainBlock}>
        <div className={styles.title}>
          <h2>{String(entity[titleKey])}</h2>
        </div>
        <div className={styles.info}>
          {fields.map(({ label, key, isLink }) => (
            <div className={styles.block} key={String(key)}>
              <h2>{label}:</h2>
              {isLink && entity[key] ? (
                Array.isArray(entity[key]) ? (
                  entity[key].length > 0 ? (
                    entity[key].map((item: any, idx: number) => (
                      <Link to={item.url} key={idx}>
                        {item.name}
                      </Link>
                    ))
                  ) : (
                    <p>N/A</p>
                  )
                ) : (
                  <Link to={(entity[key] as any).url || "/404"}>
                    {(entity[key] as any).name}
                  </Link>
                )
              ) : (
                <p>{String(entity[key] || "N/A")}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntityPage;
