import { Tag } from "antd";
import { Mode, ModesEnum } from "../../constant";

interface IProps {
  modes: number;
}
const AccelerateModes = (props: IProps) => {
  const { modes } = props;

  return (
    <>
      <Tag
        key={Mode[1][0]}
        color={
          modes === ModesEnum.highSpeed || modes === ModesEnum.both
            ? "black"
            : "gray"
        }
      >
        {Mode[ModesEnum.highSpeed][0]}
      </Tag>
      <Tag
        key={Mode[2][0]}
        color={
          modes === ModesEnum.download || modes === ModesEnum.both
            ? "black"
            : "gray"
        }
      >
        {Mode[ModesEnum.download][0]}
      </Tag>
    </>
  );
};

export default AccelerateModes;
