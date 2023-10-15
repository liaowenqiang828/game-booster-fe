import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import styles from "./index.module.less";
import { useContext, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { IClientUpdate, OSENUM } from "../../types/index";
import { IEditClientUpdateRequest } from "../../types/request";
import { addClientUpdate, editClientUpdate } from "../../api/clientUpdate";

interface IProps {
  clientUpdateConfig: IClientUpdate;
  closeModal: () => void;
  editMode: boolean;
}

const osSelectorOptions = [
  {
    label: OSENUM[OSENUM.Android],
    value: OSENUM.Android,
  },
  {
    label: OSENUM[OSENUM.IOS],
    value: OSENUM.IOS,
  },
  {
    label: OSENUM[OSENUM.PC],
    value: OSENUM.PC,
  },
];
const ClientUpdateEditModal = (props: IProps) => {
  const { clientUpdateConfig, closeModal, editMode } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [currentVer, setCurrentVer] = useState(clientUpdateConfig.ver);
  const [strongCheck, setStrongCheck] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (fieldsValue: any) => {
    const commonRequest = {
      os: fieldsValue.os,
      ver: currentVer,
      // url: fieldsValue.url,
      url: "https://a.b.c/upd/ios/aabbcc.dmp",
      md5: "dddaaaaaaaaaaaaaaaaaaaaaaaaatest",
      size: 45701394,
      must_upd: strongCheck,
      title: fieldsValue.title,
      change_log: fieldsValue.change_log,
    };
    showLoading();
    if (editMode) {
      const request: IEditClientUpdateRequest = {
        ...commonRequest,
        id: clientUpdateConfig.id,
      };
      await editClientUpdate(request).finally(() => hideLoading());
    } else {
      await addClientUpdate(commonRequest).finally(() => hideLoading());
    }
    closeModal();
  };

  const onCurrentVerChange = (e: any) => {
    setCurrentVer(e.target.value);
  };

  const onStrongCheck = (e: any) => {
    setStrongCheck(e.target.checked);
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
      <div className={styles.formTitle}>客户端升级配置/新增&编辑版本</div>
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
            label="版本号"
            name="ver"
            initialValue={clientUpdateConfig.ver}
          >
            <Input
              placeholder="请填写版本号，如：0.1.2"
              value={currentVer}
              onChange={onCurrentVerChange}
            />
            <Checkbox checked={strongCheck} onChange={onStrongCheck}>
              勾选表“更强”
            </Checkbox>
          </Form.Item>

          <Form.Item
            label="系统"
            name="os"
            initialValue={clientUpdateConfig.os}
          >
            <Select options={osSelectorOptions} placeholder="请选择系统" />
          </Form.Item>
          <Form.Item label="安装包" name="url">
            <Input placeholder="请上传安装包" />
            <Button
              type="primary"
              style={{ position: "absolute", marginLeft: "20px" }}
            >
              上传
            </Button>
          </Form.Item>
          <Form.Item
            label="标题"
            name="title"
            initialValue={clientUpdateConfig.title}
          >
            <Input placeholder="请填写版本更新弹窗标题" />
          </Form.Item>
          <Form.Item
            label="内容"
            name="change_log"
            initialValue={clientUpdateConfig.change_log}
          >
            <Input.TextArea
              placeholder="参考格式：&#13;&#10;新增｜网络测速功能&#13;&#10;新增｜移动WiFi自由切换功能&#13;&#10;优化｜加速专线网络&#13;&#10;优化｜个别游戏加速不成功"
              autoSize={{ minRows: 5 }}
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

export default ClientUpdateEditModal;
