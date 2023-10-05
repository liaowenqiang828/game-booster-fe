import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";
import { IGame } from "../../types";
import { addGame, editGame } from "../../api/game";

interface IProps {
  gameConfig: IGame;
  closeModal: () => void;
  editMode: boolean;
}
const GameConfigBasicInfoModal = (props: IProps) => {
  const { gameConfig, closeModal, editMode } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    if (editMode) {
      editGameHandler(fieldsValue);
      return;
    }
    addGameHandler(fieldsValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addGameHandler = (fieldsValue: any) => {
    showLoading();
    addGame(fieldsValue)
      .then(() => closeModal())
      .finally(() => hideLoading());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editGameHandler = (fieldsValue: any) => {
    showLoading();
    editGame(fieldsValue)
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
      <div className={styles.formTitle}>游戏配置/新增&编辑游戏/基本信息</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 1000 }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="游戏名"
            name="gameName"
            initialValue={gameConfig.title}
          >
            <Input />
            <span>(该名称将在APP游戏卡中实际展示)</span>
          </Form.Item>

          <Form.Item
            label="简介"
            name="description"
            initialValue={gameConfig.summary}
          >
            <Input />
          </Form.Item>
          <Form.Item label="icon" name="icon" initialValue={gameConfig.icon}>
            <Input type="file" />
            <Button type="primary">上传</Button>
            <img />
          </Form.Item>
          <Form.Item label="banner" name="banner">
            <Input />
            <Button type="primary">上传</Button>
            <img />
          </Form.Item>
          <Form.Item label="character" name="character">
            <Input />
            <Button type="primary">上传</Button>
            <img />
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
