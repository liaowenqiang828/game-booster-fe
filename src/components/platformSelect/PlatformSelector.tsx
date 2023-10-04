import { Button } from "antd";
import styles from "./index.module.less";
import { useState } from "react";
import { PLATFORMENUM } from "../../types";

interface IProps {
  platform: number;
  onSelect: (value: number) => void;
}

const PlatformSelector = (props: IProps) => {
  const { platform, onSelect } = props;
  const [currentPlatform, setCurrentPlatform] = useState(platform);

  const selectAndroid = () => {
    setCurrentPlatform(PLATFORMENUM.Android);
    onSelect(PLATFORMENUM.Android);
  };

  const selectIos = () => {
    setCurrentPlatform(PLATFORMENUM.iOS);
    onSelect(PLATFORMENUM.iOS);
  };
  return (
    <div className={styles.container}>
      <Button
        type={currentPlatform === PLATFORMENUM.Android ? "primary" : "text"}
        onClick={selectAndroid}
      >
        {PLATFORMENUM[PLATFORMENUM.Android]}
      </Button>
      <Button
        type={currentPlatform === PLATFORMENUM.iOS ? "primary" : "text"}
        onClick={selectIos}
      >
        {PLATFORMENUM[PLATFORMENUM.iOS]}
      </Button>
    </div>
  );
};

export default PlatformSelector;
