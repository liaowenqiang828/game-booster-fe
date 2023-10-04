import { Button, Form, Input, Modal, Switch } from "antd";
import styles from "./index.module.less";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";
import { IGamePkg } from "../../types";
import { convertTimestampToStr } from "../../utils/dataTime";
import { addGamePkg, editGamePkg } from "../../api/game";

interface IProps {
  packageInfo: IGamePkg;
  gameName: string;
  closeModal: () => void;
  editMode: boolean;
}
const GameConfigPackageNameEditModal = (props: IProps) => {
  const { closeModal, packageInfo, gameName, editMode } = props;
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
    await addGamePkg(fieldsValue)
      .then(() => closeModal())
      .finally(() => hideLoading());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editGamePkgHandler = async (fieldsValue: any) => {
    showLoading();
    await editGamePkg(fieldsValue)
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
      <div className={styles.formTitle}>游戏配置/新增&编辑游戏/包名&区服</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 300 }}
          onFinish={onSubmit}
        >
          <Form.Item label="游戏名" name="gameName" className={styles.formItem}>
            <Input disabled defaultValue={gameName} />
          </Form.Item>

          <Form.Item label="包名" name="packageName">
            <Input defaultValue={packageInfo.name} />
          </Form.Item>
          <Form.Item label="是否启用" name="isStart">
            <Switch checked={packageInfo.enabled} />
          </Form.Item>
          <Form.Item label="渠道" name="channel">
            <Input defaultValue={packageInfo.channel} />
          </Form.Item>
          <Form.Item label="签名" name="signature">
            <Input defaultValue={packageInfo.sign} />
          </Form.Item>
          <Form.Item label="启动时间" name="startTime">
            <Input
              disabled
              defaultValue={
                editMode
                  ? convertTimestampToStr(packageInfo.created_at)
                  : convertTimestampToStr(new Date().getTime())
              }
            />
          </Form.Item>
          <Form.Item label="更新时间" name="updateTime">
            <Input
              disabled
              defaultValue={
                editMode
                  ? convertTimestampToStr(packageInfo.updated_at)
                  : convertTimestampToStr(new Date().getTime())
              }
            />
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
