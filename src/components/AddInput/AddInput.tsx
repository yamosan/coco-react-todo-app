import { FC, useState } from "react";
import styles from "./AddInput.module.css";

type Props = {
  onAdd: (text: string) => void;
};

export const AddInput: FC<Props> = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="add details"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
