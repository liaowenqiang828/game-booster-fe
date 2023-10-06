import { Button } from "antd";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../context/authContext";

const Home = () => {
  const navigator = useNavigate();
  const auth = useContext(AuthContext);
  const { logout } = auth as AuthContextType;
  const onLogout = () => {
    window.localStorage.removeItem("authorization");
    window.localStorage.removeItem("userName");
    logout();
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
