import { Button } from "antd";
import styles from "./index.module.less";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>Home</div>
        <Button className={styles.exitLogin}>退出账号</Button>
      </div>
      <div className={styles.content}></div>
    </div>
  );
};

export default Home;
