import { Button, Form, Input, Modal, Switch } from "antd";
import styles from "./index.module.less";
import { useContext, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { IGamePkg } from "../../types/index";
import { convertTimestampToStr } from "../../utils/dataTime";
import { addGamePkg, editGamePkg } from "../../api/game";
import { IAddGamePkgRequest, IEditGamePkgRequest } from "../../types/request";

interface IProps {
  packageInfo: IGamePkg;
  gameName: string;
  closeModal: (needRefresh: boolean) => void;
  editMode: boolean;
  gameId: number;
}
const GameConfigPackageNameEditModal = (props: IProps) => {
  const { closeModal, packageInfo, gameName, editMode, gameId } = props;
  const [currentEnabled, setCurrentEnabled] = useState(packageInfo.enabled);

  const { showLoading, hideLoading } = useContext(LoadingContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    if (editMode) {
      editGamePkgHandler(fieldsValue);
      return;
    }

    addGamePkgHandler(fieldsValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addGamePkgHandler = async (fieldsValue: any) => {
    showLoading();
    const request: IAddGamePkgRequest = {
      game_id: gameId,
      name: fieldsValue.name,
      sign: fieldsValue.sign,
      channel: fieldsValue.channel,
      enabled: fieldsValue.enabled,
    };

    await addGamePkg(request)
      .then(() => closeModal(true))
      .finally(() => hideLoading());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editGamePkgHandler = async (fieldsValue: any) => {
    showLoading();
    const request: IEditGamePkgRequest = {
      name: fieldsValue.name,
      sign: fieldsValue.sign,
      channel: fieldsValue.channel,
      enabled: fieldsValue.enabled,
    };
    await editGamePkg(request)
      .then(() => closeModal(true))
      .finally(() => hideLoading());
  };

  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={() => closeModal(false)}
      width={800}
      closable
      maskClosable={false}
    >
      <div className={styles.formTitle}>
        游戏配置/新增&编辑游戏/新增&编辑包名
      </div>
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
            <Input placeholder="请填写游戏卡片处游戏名" disabled />
          </Form.Item>

          <Form.Item label="包名" name="name" initialValue={packageInfo.name}>
            <Input placeholder="请前往游戏库查询" />
          </Form.Item>
          <Form.Item label="是否启用" name="enabled">
            <Switch
              checked={currentEnabled}
              onChange={(checked: boolean) => setCurrentEnabled(checked)}
            />
          </Form.Item>
          <Form.Item
            label="渠道"
            name="channel"
            initialValue={packageInfo.channel}
          >
            <Input placeholder="请填写渠道名，如“小米”" />
          </Form.Item>
          <Form.Item label="签名" name="sign" initialValue={packageInfo.sign}>
            <Input placeholder="请填写游戏签名" />
          </Form.Item>
          <Form.Item
            label="启动时间"
            name="created_at"
            initialValue={
              editMode
                ? convertTimestampToStr(packageInfo.created_at)
                : convertTimestampToStr(new Date().getTime())
            }
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="更新时间"
            name="update_at"
            initialValue={
              editMode
                ? convertTimestampToStr(packageInfo.updated_at)
                : convertTimestampToStr(new Date().getTime())
            }
          >
            <Input disabled />
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
export default GameConfigPackageNameEditModal;
