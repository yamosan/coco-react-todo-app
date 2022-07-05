import type { FC } from "react";
import { Memo } from "../../types/Memo";
import styles from "./MemoList.module.css";
import { BiTrashAlt } from "react-icons/bi";

type Props = {
  memos: Memo[];
  onToggleChecked: (id: string) => void;
  withDeleteButton?: boolean;
  onDelete?: (id: string) => void;
};

export const MemoList: FC<Props> = ({
  memos,
  onToggleChecked,
  withDeleteButton = false,
  onDelete,
}) => {
  return (
    <div>
      <ul className={styles.ul}>
        {memos.map((memo) => (
          <li key={memo.id} className={styles.li}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                onChange={() => onToggleChecked(memo.id)}
                checked={memo.isChecked}
              />
              <span className={styles.checkmark}></span>
              <span className={styles.text}>{memo.title}</span>
            </label>
            {withDeleteButton && (
              <button
                className={styles.deleteButton}
                onClick={() => onDelete && onDelete(memo.id)}
              >
                <BiTrashAlt />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
