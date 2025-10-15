import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

function Tabs({ defaultValue, values, children }) {
  const [value, setValue] = useState(defaultValue);
  const order = values;

  const goNext = () => {
    const i = order.indexOf(value);
    if (i >= 0) setValue(order[(i + 1) % order.length]);
  };

  return (
    <TabsContext.Provider value={{ value, setValue, order, goNext }}>
      <div style={styles.book}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabTrigger({ value, children }) {
  const { value: active, setValue } = useContext(TabsContext);
  const isActive = active === value;
  return (
    <button
      onClick={() => setValue(value)}
      style={{
        ...styles.tab,
        ...(isActive ? styles.tabActive : {}),
      }}
    >
      <span aria-hidden style={styles.tabIcon}>
        {isActive ? "🪄" : "✨"}
      </span>
      {children}
    </button>
  );
}

function TabPanel({ value, children }) {
  const { value: active } = useContext(TabsContext);
  if (active !== value) return null;
  return <div style={styles.page}>{children}</div>;
}

function TabsNext({ children = "다음 장 >" }) {
  const { goNext } = useContext(TabsContext);
  return (
    <button onClick={goNext} style={styles.nextBtn}>
      {children}
    </button>
  );
}

Tabs.Trigger = TabTrigger;
Tabs.Panel = TabPanel;
Tabs.Next = TabsNext;

export default function StoryTabs() {
  const chapters = ["prologue", "adventure", "ending"];

  return (
    <Tabs defaultValue="prologue" values={chapters}>
      <div style={styles.tabsWrap}>
        <Tabs.Trigger value="prologue">프롤로그</Tabs.Trigger>
        <Tabs.Trigger value="adventure">모험</Tabs.Trigger>
        <Tabs.Trigger value="ending">엔딩</Tabs.Trigger>
      </div>

      <Tabs.Panel value="prologue">
        <h3 style={styles.title}>프롤로그 🌤️</h3>
        <p style={styles.text}>
          작은 탭 요정 <b>태비</b>가 살고 있었어요. 탭을 누르면 세상이 반짝!
          오늘도 새로운 장을 열 용기를 모으는 중… 🐣
        </p>
        <ul style={styles.bullets}>
          <li>목표: 반짝이는 콘텐츠 조각 찾기 ✨</li>
          <li>아이템: 마법 커서 🖱️, 라운드 버튼 🔘</li>
        </ul>
        <Tabs.Next>시작 👉</Tabs.Next>
      </Tabs.Panel>

      <Tabs.Panel value="adventure">
        <h3 style={styles.title}>모험의 장 🗺️</h3>
        <p style={styles.text}>
          태비는 <b>Compound</b> 숲을 지나 <b>Context</b> 다리를 건넜어요. 버튼
          친구와 패널 친구가 서로 신호를 주고받으며 길을 밝혀줬죠! 🔦
        </p>
        <div style={styles.card}>
          <span role="img" aria-label="sparkles" style={{ fontSize: 20 }}>
            💎
          </span>
          <div>
            <b>획득:</b> 상태 공유의 비밀 — <code>createContext()</code>
          </div>
        </div>
        <Tabs.Next>결말 보러 가기 👉</Tabs.Next>
      </Tabs.Panel>

      <Tabs.Panel value="ending">
        <h3 style={styles.title}>엔딩 🎉</h3>
        <p style={styles.text}>
          태비는 알았어요. <b>“트리거와 패널은 함께일 때 더 반짝인다!”</b>
          그리고 다음 모험을 위해 <code>&lt;Tabs.Next /&gt;</code>를 주머니에
          넣었답니다. 🌈
        </p>
        <Tabs.Next>다시 처음부터 🔁</Tabs.Next>
      </Tabs.Panel>
    </Tabs>
  );
}

const styles = {
  book: {
    display: "grid",
    gap: 16,
    padding: " 16px",
  },
  tabsWrap: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  tab: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid #e8e8f3",
    background: "#fff",
    cursor: "pointer",
  },
  tabActive: {
    background: "#f6ecff",
    border: "1px solid #d2b7ff",
    transform: "translateY(-1px)",
  },
  tabIcon: { fontSize: 14, marginRight: 6 },
  page: {
    padding: 16,
    borderRadius: 16,
    border: "1px solid #f0e7ff",
    background: "linear-gradient(180deg,#ffffff 0%,#faf6ff 100%)",
    boxShadow: "0 6px 14px rgba(110, 71, 255, .08)",
  },
  title: { margin: "0 0 8px 0" },
  text: { margin: "0 0 12px 0", lineHeight: 1.6 },
  bullets: { margin: "0 0 12px 18px" },
  card: {
    display: "grid",
    gridTemplateColumns: "24px 1fr",
    gap: 10,
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    background: "#fff",
    border: "1px dashed #e6ddff",
    marginBottom: 12,
  },
  nextBtn: {
    marginTop: 6,
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #e6ddff",
    background: "#fff",
    cursor: "pointer",
  },
};
