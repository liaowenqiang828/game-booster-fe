import { Button, Form, Input, Modal, Select, Tag } from "antd";
import styles from "./index.module.less";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { IAclGroup, IGameBoostConfig, PLATFORMENUM } from "../../types/index";
import { editGameBoostConfig, getGameBoostConfigList } from "../../api/game";
import PlatformSelector from "../platformSelect/PlatformSelector";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { IEditGameBoostConfigRequest } from "../../types/request";

interface IProps {
  gameId: number;
  gameName: string;
  closeModal: () => void;
  aclGroups: IAclGroup[];
}
const GameAccelerateConfigEditModal = (props: IProps) => {
  const { closeModal, gameId, gameName, aclGroups } = props;
  const [gameBoostConfig, setGameBoostConfig] = useState<
    IGameBoostConfig | undefined
  >(undefined);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [os, setOs] = useState(PLATFORMENUM.Android);
  const [androidAclInfo, setAndroidAclInfo] = useState<{
    android_acl: string;
    android_acl_groups: number[];
  }>({
    android_acl: gameBoostConfig?.android_acl || "",
    android_acl_groups: gameBoostConfig?.android_acl_groups || [],
  });
  const [iosAclInfo, setIosAclInfo] = useState<{
    ios_acl: string;
    ios_acl_groups: number[];
  }>({
    ios_acl: gameBoostConfig?.ios_acl || "",
    ios_acl_groups: gameBoostConfig?.ios_acl_groups || [],
  });

  const aclGroupOptions = aclGroups.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    showLoading();
    getGameBoostConfigList({ game_id: gameId })
      .then((res) => {
        setGameBoostConfig(res.cfg);
        setAndroidAclInfo({
          android_acl_groups: res.cfg.android_acl_groups,
          android_acl: res.cfg.android_acl,
        });
        setIosAclInfo({
          ios_acl_groups: res.cfg.ios_acl_groups,
          ios_acl: res.cfg.ios_acl,
        });
      })
      .finally(() => hideLoading());
  }, []);

  const onPlatformChange = (osValue: number) => {
    setOs(osValue);
  };

  const onAclGroupChange = (values: number[]) => {
    console.log("value", values);
    if (os === PLATFORMENUM.Android) {
      setAndroidAclInfo({ ...androidAclInfo, android_acl_groups: values });
    } else {
      setIosAclInfo({ ...iosAclInfo, ios_acl_groups: values });
    }
  };

  const onAclContentChange = (e: any) => {
    if (os === PLATFORMENUM.Android) {
      setAndroidAclInfo({ ...androidAclInfo, android_acl: e.target.value });
    } else {
      setIosAclInfo({ ...iosAclInfo, ios_acl: e.target.value });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    showLoading();
    const request: IEditGameBoostConfigRequest = {
      game_id: gameId,
      boost_pkgs: Array.from(fieldsValue.boost_pkgs.split("\n")),
      ...androidAclInfo,
      ...iosAclInfo,
    };

    editGameBoostConfig(request)
      .then(() => closeModal())
      .finally(() => hideLoading());
  };

  const tagRender = (props: CustomTagProps) => {
    const { label } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="#1677ff"
        onMouseDown={onPreventMouseDown}
        closable={false}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  if (!gameBoostConfig) return null;

  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={closeModal}
      width={800}
      closable
      maskClosable={false}
    >
      <div className={styles.formTitle}>
        游戏配置/新增&编辑游戏/新增&编辑加速配置
      </div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 320 }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="游戏名"
            name="gameName"
            className={styles.formItem}
            initialValue={gameName}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="加速包名"
            name="boost_pkgs"
            initialValue={gameBoostConfig.boost_pkgs.join("\n")}
          >
            <Input.TextArea autoSize={{ minRows: 5 }} />
          </Form.Item>
          <Form.Item label="" name="system">
            <PlatformSelector platform={os} onSelect={onPlatformChange} />
          </Form.Item>
          {os === PLATFORMENUM.Android && (
            <Form.Item
              label="调用ACL组(可多选)"
              name="andrios_acl_group"
              initialValue={gameBoostConfig.android_acl_groups}
            >
              <Select
                mode="multiple"
                options={aclGroupOptions}
                onChange={onAclGroupChange}
                tagRender={tagRender}
              />
            </Form.Item>
          )}

          {os === PLATFORMENUM.iOS && (
            <Form.Item
              label="调用ACL组(可多选)"
              name="ios_acl_group"
              initialValue={gameBoostConfig.ios_acl_groups}
            >
              <Select
                mode="multiple"
                options={aclGroupOptions}
                onChange={onAclGroupChange}
                tagRender={tagRender}
              />
            </Form.Item>
          )}
          {os === PLATFORMENUM.Android && (
            <Form.Item
              label="内容"
              name="android_acl"
              initialValue={gameBoostConfig.android_acl}
            >
              <Input.TextArea
                autoSize={{ minRows: 10 }}
                onChange={onAclContentChange}
              />
            </Form.Item>
          )}
          {os === PLATFORMENUM.iOS && (
            <Form.Item
              label="内容"
              name="ios_acl"
              initialValue={gameBoostConfig.ios_acl}
            >
              <Input.TextArea
                autoSize={{ minRows: 10 }}
                onChange={onAclContentChange}
              />
            </Form.Item>
          )}
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
