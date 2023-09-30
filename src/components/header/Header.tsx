import styles from "./index.module.less";
import alienIcon from "../../assets/images/alien_icon.svg";
import userIcon from "../../assets/images/user_icon.svg";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img className={styles.alienIcon} src={alienIcon} alt="icon" />
        <span>加速器管理后台</span>
      </div>
      <div className={styles.right}>
        <span>MESH@xyz.fun</span>
        <img src={userIcon} alt="user" className={styles.userIcon} />
      </div>
    </div>
  );
};

export default Header;
