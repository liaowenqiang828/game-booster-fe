import Header from "../../components/header/Header";
import Navigator from "../../components/navigator/Navigator";
import { Outlet } from "react-router-dom";
import styles from "./index.module.less";

const AppPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Navigator />
        <Outlet />
      </div>
    </div>
  );
};

export default AppPage;
