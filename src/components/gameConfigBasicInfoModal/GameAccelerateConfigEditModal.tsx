import { Button, Form, Input, Modal, Select } from "antd";
import styles from "./index.module.less";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { IGameBoostConfig, PLATFORMENUM } from "../../types";
import { editGameBoostConfig, getGameBoostConfigList } from "../../api/game";
import PlatformSelector from "../platformSelect/PlatformSelector";

interface IProps {
  gameId: number;
  gameName: string;
  closeModal: () => void;
}
const GameAccelerateConfigEditModal = (props: IProps) => {
  const { closeModal, gameId, gameName } = props;
  const [gameBoostConfig, setGameBoostConfig] = useState(
    {} as IGameBoostConfig
  );
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [os, setOs] = useState(PLATFORMENUM.Android);

  useEffect(() => {
    showLoading();
    getGameBoostConfigList({ game_id: gameId })
      .then((res) => {
        setGameBoostConfig(res.cfg);
      })
      .finally(() => hideLoading());
  }, []);

  const onPlatformChange = (osValue: number) => {
    setOs(osValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    showLoading();
    editGameBoostConfig(fieldsValue)
      .then(() => closeModal())
      .finally(() => hideLoading());
  };

  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={closeModal}
      width={800}
      closable
    >
      <div className={styles.formTitle}>DNS配置/新增&编辑DNS配置</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 300 }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="游戏名"
            name="gameName"
            className={styles.formItem}
            initialValue={gameName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="加速包名"
            name="acceratePackageName"
            initialValue={gameBoostConfig.boost_pkgs}
          >
            <Input.TextArea autoSize={{ minRows: 5 }} />
          </Form.Item>
          <Form.Item label="" name="system">
            <PlatformSelector platform={os} onSelect={onPlatformChange} />
          </Form.Item>
          <Form.Item label="调用ACL组(可多选)" name="applyAclGroup">
            <Select
              // todo options from ?
              // options={}
              defaultValue={
                os === PLATFORMENUM.Android
                  ? gameBoostConfig.android_acl_groups
                  : gameBoostConfig.ios_acl_groups
              }
            />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            initialValue={
              os === PLATFORMENUM.Android
                ? gameBoostConfig.android_acl
                : gameBoostConfig.ios_acl_content
            }
          >
            <Input.TextArea autoSize={{ minRows: 10 }} />
          </Form.Item>
          <Form.Item label="">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default GameAccelerateConfigEditModal;
