import { Form, Input, Switch, Button } from "antd";
import styles from "./index.module.less";
import PlatformSelector from "../../components/platformSelect/PlatformSelector";
import { useState } from "react";

const GlobalAclConfig = () => {
  const [selectPlatform, setSelectPlatform] = useState("Android");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    const submitObj = { ...fieldsValue, platform: selectPlatform };
    console.log(submitObj);
  };

  const onPlatformSelect = (platform: string) => {
    setSelectPlatform(platform);
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.bread}>面包屑</div>
        <div className={styles.title}>全局ACL配置</div>
        <div className={styles.descSection}>
          全局ACL用来控制全局的黑名单，任何游戏都会使用，非及时生效，增加时请注意校验格式
        </div>
      </div>
      <div className={styles.formWrapper}>
        <Form onFinish={onSubmit}>
          <Form.Item name="platform">
            <PlatformSelector platform="Android" onSelect={onPlatformSelect} />
          </Form.Item>
          <Form.Item name="content">
            <Input.TextArea autoSize={{ minRows: 15 }} />
          </Form.Item>
          <Form.Item label="">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default GlobalAclConfig;
