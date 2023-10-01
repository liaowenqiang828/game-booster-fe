import { Form, Input, Switch, Button } from "antd";
import styles from "./index.module.less";

const GlobalAclConfig = () => {
  return (
    <div>
      <div>面包屑</div>
      <div className={styles.title}>全局ACL配置</div>
      <div className={styles.descSection}>
        全局ACL用来控制全局的黑名单，任何游戏都会使用，非及时生效，增加时请注意校验格式
      </div>

      <Form>
        <Form.Item>
          <Switch />
        </Form.Item>
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item label="">
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GlobalAclConfig;
