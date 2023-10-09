import { Input, Button, Breadcrumb } from "antd";
import styles from "./index.module.less";
import PlatformSelector from "../../components/platformSelect/PlatformSelector";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { editGloablAcl, getGlobalAclList } from "../../api/globalAcl";
import { PLATFORMENUM } from "../../types";
const { TextArea } = Input;
const GlobalAclConfig = () => {
  const [selectPlatform, setSelectPlatform] = useState(PLATFORMENUM.Android);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [androidAcl, setAndroidAcl] = useState("");
  const [iosAcl, setIosAcl] = useState("");

  useEffect(() => {
    const getGlobalAclAsync = async () => {
      const res = await getGlobalAclList();
      setAndroidAcl(res.android_acl);
      setIosAcl(res.ios_acl);
    };

    getGlobalAclAsync();
  }, []);

  const onSubmit = async () => {
    showLoading();
    await editGloablAcl({
      os: selectPlatform,
      acl: selectPlatform === PLATFORMENUM.Android ? androidAcl : iosAcl,
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
        <PlatformSelector
          platform={PLATFORMENUM.Android}
          onSelect={onPlatformSelect}
        />
        {selectPlatform === PLATFORMENUM.Android && (
          <TextArea
            autoSize={{ minRows: 15 }}
            value={androidAcl}
            onChange={(e) => setAndroidAcl(e.target.value)}
            className={styles.textArea}
          />
        )}
        {selectPlatform === PLATFORMENUM.iOS && (
          <TextArea
            autoSize={{ minRows: 15 }}
            value={iosAcl}
            onChange={(e) => setIosAcl(e.target.value)}
            className={styles.textArea}
          />
        )}
        <Button type="primary" onClick={onSubmit}>
          提交
        </Button>
      </div>
    </div>
  );
};

export default GlobalAclConfig;
