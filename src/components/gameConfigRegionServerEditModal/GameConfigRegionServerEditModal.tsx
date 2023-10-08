import { Button, Form, Input, Modal, Switch } from "antd";
import styles from "./index.module.less";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";
import { IGameRegion } from "../../types";
import {
  IAddGameRegionRequest,
  IEditGameRegionRequest,
} from "../../types/request";
import { addGameRegion, editGameRegion } from "../../api/game";
import { convertTimestampToStr } from "../../utils/dataTime";

interface IProps {
  regionServer: IGameRegion;
  gameName: string;
  closeModal: () => void;
  editMode: boolean;
}
const GameConfigRegionServerEditModal = (props: IProps) => {
  const { closeModal, regionServer, gameName, editMode } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    if (editMode) {
      editGameRegionHandler(fieldsValue);
      return;
    }

    addGameRegionHandler(fieldsValue);
  };

  const addGameRegionHandler = (request: IAddGameRegionRequest) => {
    showLoading();
    addGameRegion(request)
      .then(() => closeModal())
      .finally(() => hideLoading());
  };

  const editGameRegionHandler = (request: IEditGameRegionRequest) => {
    showLoading();
    editGameRegion(request)
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
      maskClosable={false}
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

          <Form.Item
            label="区服名"
            name="regionServerName"
            initialValue={regionServer.name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="是否启用"
            name="isStart"
            initialValue={regionServer.enabled}
          >
            <Switch defaultChecked={regionServer.enabled} />
          </Form.Item>
          <Form.Item
            label="DNS"
            name="dns"
            initialValue={regionServer.dns_group}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="加速网络"
            name="accelerateLine"
            initialValue={regionServer.boost_zones}
          >
            <Input />
          </Form.Item>
          <Form.Item label="签名" name="signature">
            <Input />
          </Form.Item>
          <Form.Item
            label="启动时间"
            name="startTime"
            initialValue={
              editMode
                ? convertTimestampToStr(regionServer.created_at)
                : convertTimestampToStr(new Date().getTime())
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="更新时间"
            name="updateTime"
            initialValue={
              editMode
                ? convertTimestampToStr(regionServer.updated_at)
                : convertTimestampToStr(new Date().getTime())
            }
          >
            <Input disabled defaultValue="" />
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
export default GameConfigRegionServerEditModal;
