import { Button } from "antd";
import styles from "./index.module.less";
import { useState } from "react";

interface IProps {
  platform: string;
  onSelect: (value: string) => void;
}

const PLATFORM = {
  ANDROID: "Android",
  IOS: "iOS",
};

const PlatformSelector = (props: IProps) => {
  const { platform, onSelect } = props;
  const [currentPlatform, setCurrentPlatform] = useState(platform);

  const selectAndroid = () => {
    setCurrentPlatform(PLATFORM.ANDROID);
    onSelect(PLATFORM.ANDROID);
  };

  const selectIos = () => {
    setCurrentPlatform(PLATFORM.IOS);
    onSelect(PLATFORM.IOS);
  };
  return (
    <div className={styles.container}>
      <Button
        type={currentPlatform === PLATFORM.ANDROID ? "primary" : "text"}
        onClick={selectAndroid}
      >
        {PLATFORM.ANDROID}
      </Button>
      <Button
        type={currentPlatform === PLATFORM.IOS ? "primary" : "text"}
        onClick={selectIos}
      >
        {PLATFORM.IOS}
      </Button>
    </div>
  );
};

export default PlatformSelector;
