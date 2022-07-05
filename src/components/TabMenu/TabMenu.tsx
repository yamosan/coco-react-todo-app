import type { FC } from "react";
import styles from "./TabMenu.module.css";

export type TabMenuState = "ALL" | "COMPLETED" | "ACTIVE";

type Props = {
  state: TabMenuState;
  onStateChange: (newState: TabMenuState) => void;
};

const TAB_ORDER = ["ALL", "ACTIVE", "COMPLETED"] as const;

export const TabMenu: FC<Props> = ({ state, onStateChange }) => {
  const getActiveStyle = (s: TabMenuState) =>
    state === s ? styles.tabActive : "";

  return (
    <div className={styles.root}>
      <ul>
        {TAB_ORDER.map((state) => (
          <li className={`${styles.tab} ${getActiveStyle(state)}`}>
            <button
              className={styles.button}
              onClick={() => onStateChange(state)}
            >
              {state}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
