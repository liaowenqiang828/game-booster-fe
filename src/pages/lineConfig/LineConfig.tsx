import { Button, Input, Table, Tag } from "antd";
import styles from "./index.module.less";
import SwitchTag from "../../components/switchTag/SwitchTag";
import { ColumnsType } from "antd/es/table";

interface ILineConfig {
  key: string;

  lineName: string;
  isStart: boolean;
  country: string;
  region: string;
  entry: string;
  exit: string;
  speedTestAddress: string;
  startTime: string;
  updateTime: string;
}

const mockDataSource: ILineConfig[] = [
  {
    key: "1",
    lineName: "上海日本一区",
    isStart: true,
    country: "中国",
    region: "上海",
    entry: "CN",
    exit: "JP",
    speedTestAddress: "101.202.55.44:10000",
    startTime: "2023-09-17 15:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
  {
    key: "2",
    lineName: "广州日本一区",
    isStart: false,
    country: "中国",
    region: "广州",
    entry: "CN",
    exit: "JP",
    speedTestAddress: "101.202.55.44:10000",
    startTime: "2023-09-17 15:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
  {
    key: "3",
    lineName: "香港日本一区",
    isStart: true,
    country: "香港",
    region: "九龙",
    entry: "HK",
    exit: "JP",
    speedTestAddress: "101.202.55.44:10000",
    startTime: "2023-09-17 15:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
];
const LineConfig = () => {
  const columns: ColumnsType<ILineConfig> = [
    {
      title: "线路名",
      dataIndex: "lineName",
      key: "lineName",
    },
    {
      title: "是否启用",
      dataIndex: "isStart",
      key: "isStart",
      render: (isStart: boolean) => <SwitchTag check={isStart} />,
    },
    {
      title: "国家",
      dataIndex: "country",
      key: "country",
      render: (country: string) =>
        country && <Tag color="black">{country}</Tag>,
    },
    {
      title: "地区",
      dataIndex: "region",
      key: "region",
      render: (region: string) => region && <Tag color="black">{region}</Tag>,
    },
    {
      title: "入口",
      dataIndex: "entry",
      key: "entry",
      render: (entry: string) => entry && <Tag color="black">{entry}</Tag>,
    },
    {
      title: "出口",
      dataIndex: "exit",
      key: "exit",
      render: (exit: string) => exit && <Tag color="black">{exit}</Tag>,
    },
    {
      title: "测速地址",
      dataIndex: "speedTestAddress",
      key: "speedTestAddress",
    },
    {
      title: "启动时间",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.editBtn}
          onClick={(e) => editLineConfigItemHandler(e, record.key)}
        >
          编辑
        </Button>
      ),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editLineConfigItemHandler = (e: any, key: string) => {
    console.log(e);
    console.log(key);
  };

  const addNewLineHandler = () => {
    console.log("add new line");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>线路配置</div>
        <Input.Search placeholder="在此搜索线路名" className={styles.search} />
        <Button
          onClick={addNewLineHandler}
          type="primary"
          className={styles.addNewBtn}
        >
          新增线路
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mockDataSource}
        className={styles.table}
      />
    </div>
  );
};

export default LineConfig;
