import { Button } from "antd";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";
import { clearLoginInfo } from "../../utils";

const Home = () => {
  const navigator = useNavigate();
  const onLogout = () => {
    clearLoginInfo();
    navigator("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>Home</div>
        <Button className={styles.exitLogin} onClick={onLogout}>
          退出账号
        </Button>
      </div>
      <div className={styles.content}></div>
    </div>
  );
};

export default Home;
