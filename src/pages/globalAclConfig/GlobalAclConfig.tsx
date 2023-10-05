import { Form, Input, Button, Breadcrumb } from "antd";
import styles from "./index.module.less";
import PlatformSelector from "../../components/platformSelect/PlatformSelector";
import { useContext, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { editGloablAcl } from "../../api/globalAcl";
import { PLATFORMENUM } from "../../types";

const GlobalAclConfig = () => {
  const [selectPlatform, setSelectPlatform] = useState(PLATFORMENUM.Android);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (fieldsValue: any) => {
    const submitObj = { ...fieldsValue, platform: selectPlatform };
    console.log(submitObj);
    showLoading();
    await editGloablAcl({
      os: selectPlatform,
      acl: fieldsValue.content,
    }).finally(() => hideLoading());
  };

  const onPlatformSelect = (os: number) => {
    setSelectPlatform(os);
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <Breadcrumb
          items={[
            {
              title: "ACL配置",
            },
            {
              title: "全局ACL配置",
            },
          ]}
        />
        <div className={styles.title}>全局ACL配置</div>
        <div className={styles.descSection}>
          全局ACL用来控制全局的黑名单，任何游戏都会使用，非及时生效，增加时请注意校验格式
        </div>
      </div>
      <div className={styles.formWrapper}>
        <Form onFinish={onSubmit}>
          <Form.Item name="platform">
            <PlatformSelector
              platform={PLATFORMENUM.Android}
              onSelect={onPlatformSelect}
            />
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
