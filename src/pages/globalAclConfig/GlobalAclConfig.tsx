import { Input, Button, Breadcrumb } from "antd";
import styles from "./index.module.less";
import PlatformSelector from "../../components/platformSelect/PlatformSelector";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { editGloablAcl, getGlobalAclList } from "../../api/globalAcl";
import { PLATFORMENUM } from "../../types/index";
const { TextArea } = Input;

const aclTextAreaPlaceholder = `
  请输入具体的 ACL ，每行一条
  配置格式如下：

  DM ：域名，完整匹配域名
  DMK ：域名关键字，域名中存在配置的关键字即可，一般不用
  DMS ：域名后缀，后缀匹配
  port ：匹配端口号
  IP ：按 CIDR 匹配某个 IP 或者某个 IP 段
  DEF ：匹配不上时的默认
  DL ：走下载节点
  HS ：走高速节点
  NP ：直连，不走服务器转发

  如：
  DM ,dL.xxyy.com, DL 
  DMK , uucc , HS 
  DMS ,fsbk.com, HS 
  port ,443, NP 
  port ,80, NP 
  IP ,12.12.0.0/16, HS 
  IP ,12.12.12.0/24, HS 
  DEF ,, NP
`;

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
            placeholder={aclTextAreaPlaceholder}
          />
        )}
        {selectPlatform === PLATFORMENUM.iOS && (
          <TextArea
            autoSize={{ minRows: 15 }}
            value={iosAcl}
            onChange={(e) => setIosAcl(e.target.value)}
            className={styles.textArea}
            placeholder={aclTextAreaPlaceholder}
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
