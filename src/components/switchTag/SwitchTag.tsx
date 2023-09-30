import { Switch } from "antd";
import styles from "./index.module.less";

interface IProps {
  check: boolean;
}
const SwitchTag = (props: IProps) => {
  return (
    <div className={styles.container}>
      <Switch
        size="small"
        className={styles.switch}
        checked={props.check}
        disabled
      />
    </div>
  );
};

export default SwitchTag;
