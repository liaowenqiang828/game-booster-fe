import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { IGameConfig } from "../../pages/gameConfig/GameConfig";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";

interface IProps {
  gameConfig: IGameConfig;
  closeModal: () => void;
}
const GameConfigBasicInfoModal = (props: IProps) => {
  const { gameConfig, closeModal } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const onSubmit = () => {
    showLoading();
    setTimeout(() => {
      hideLoading();
      closeModal();
    }, 2000);
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
      <div className={styles.formTitle}>游戏配置/新增&编辑游戏/基本信息</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 300 }}
          onFinish={onSubmit}
        >
          <Form.Item label="游戏名" name="gameName">
            <Input defaultValue={gameConfig.gameName} />
            <span>(该名称将在APP游戏卡中实际展示)</span>
          </Form.Item>

          <Form.Item label="简介" name="description">
            <Input defaultValue={gameConfig.description} />
          </Form.Item>
          <Form.Item label="icon" name="icon">
            <Input />
          </Form.Item>
          <Form.Item label="banner" name="banner">
            <Input />
          </Form.Item>
          <Form.Item label="character" name="character">
            <Input />
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

export default GameConfigBasicInfoModal;
