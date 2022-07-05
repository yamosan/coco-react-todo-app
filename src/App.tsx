import { useState } from "react";
import styles from "./App.module.css";
import { AddInput } from "./components/AddInput";
import { MemoList } from "./components/MemoList";
import { TabMenu, TabMenuState } from "./components/TabMenu";
import { Memo } from "./types/Memo";
import { v4 as uuid } from "uuid";
import { BiTrashAlt } from "react-icons/bi";

import "modern-normalize";

const DUMMY_DATA = [
  { id: uuid(), title: "Do coding challenges", isChecked: false },
  { id: uuid(), title: "Do coding challenges", isChecked: false },
  { id: uuid(), title: "Do coding challenges", isChecked: true },
];

function App() {
  const [memos, setMemos] = useState<Memo[]>(DUMMY_DATA);
  const [tabState, setTabState] = useState<TabMenuState>("ALL");

  // メモに関する操作
  const toggleCheck = (id: string) => {
    setMemos((prev) =>
      prev.map((m) => (id === m.id ? { ...m, isChecked: !m.isChecked } : m))
    );
  };
  const AddOne = (text: string) => {
    setMemos((prev) => [
      ...prev,
      { id: uuid(), title: text, isChecked: false },
    ]);
  };
  const deleteOne = (id: string) => {
    setMemos((prev) => prev.filter((m) => id !== m.id));
  };
  const deleteCompletedAll = () => {
    setMemos((prev) => prev.filter((m) => !m.isChecked));
  };

  // タブの状態を切り替える
  const changeTabState = (newState: TabMenuState) => {
    setTabState(newState);
  };

  const filteredMemos = (() => {
    switch (tabState) {
      case "ALL":
        return memos;
      case "COMPLETED":
        return memos.filter((m) => m.isChecked);
      case "ACTIVE":
        return memos.filter((m) => !m.isChecked);
    }
  })();

  return (
    <div className={styles.container}>
      <header className={styles.header}>#todo</header>
      <main className={styles.main}>
        {tabState === "COMPLETED" ? (
          <>
            <TabMenu state={tabState} onStateChange={changeTabState} />
            <AddInput onAdd={AddOne} />
            <MemoList
              memos={filteredMemos}
              onToggleChecked={toggleCheck}
              withDeleteButton
              onDelete={deleteOne}
            />
            <button
              className={styles.deleteButton}
              onClick={deleteCompletedAll}
            >
              <BiTrashAlt />
              delete all
            </button>
          </>
        ) : (
          <>
            <TabMenu state={tabState} onStateChange={changeTabState} />
            <AddInput onAdd={AddOne} />
            <MemoList memos={filteredMemos} onToggleChecked={toggleCheck} />
          </>
        )}
      </main>
      <footer className={styles.footer}>
        created by yamosan - devChallenges.io
      </footer>
    </div>
  );
}

export default App;
