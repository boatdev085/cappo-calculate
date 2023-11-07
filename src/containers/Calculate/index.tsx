import { Button } from "antd";
import {
  PercentageOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import { styled } from "styled-components";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";
type Props = {};

const Calculate = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentNumber, setCurrentNumber] = useState("0");
  const [holdData, setHoldData] = useState<{
    num1: string;
    num2: string;
    operator: string;
  }>();

  const [isReverse, setIsReverse] = useState(false);
  const handleSetNumber = (num: string) => {
    if (currentNumber === "0") {
      setCurrentNumber(num.toString());
    } else {
      if (holdData?.num1) {
        setCurrentNumber(`${holdData.num2}${num}`);
        setHoldData({ ...holdData, num2: `${holdData.num2}${num}` });
      } else {
        setCurrentNumber((prevInput) => prevInput + num);
      }
    }
  };

  const handleCalculate = async () => {
    const result = await axios
      .post("http://localhost:8081/calculate", holdData)
      ?.catch(() => undefined);
    let getResult = Number(result?.data?.result || 0);
    messageApi.open({
      type: "success",
      content: `calculate ${result?.data?.responseTime || 0}ms`,
    });
    setCurrentNumber(getResult.toString());
    setHoldData({
      num1: getResult.toString(),
      operator: holdData?.operator || "",
      num2: "",
    });
  };
  const handleOperator = (operator: string) => {
    if (holdData?.num1 && holdData?.num2) {
      handleCalculate();
    } else {
      setHoldData({ num1: currentNumber, operator: operator, num2: "" });
    }
  };
  return (
    <Container>
      {contextHolder}
      <BoxResult>{currentNumber}</BoxResult>
      <WrapActionAndNumber>
        <CustomButton
          className="sub-action"
          onClick={() => {
            setCurrentNumber("0");
            setHoldData(undefined);
          }}
        >
          {currentNumber !== "0" ? "C" : "AC"}
        </CustomButton>
        <CustomButton
          className="sub-action"
          onClick={() => {
            if (!isReverse) {
              setCurrentNumber(`-${currentNumber}`);
            } else {
              setCurrentNumber(currentNumber.replace("-", ""));
            }
            setIsReverse(!isReverse);
          }}
        >
          <PlusOutlined />
          <MinusOutlined style={{ transform: "rotate(-45deg)" }} />
          <MinusOutlined />
        </CustomButton>
        <CustomButton className="sub-action">
          <PercentageOutlined />
        </CustomButton>
        <CustomButton className="main-action">
          <MinusOutlined
            style={{ transform: "rotate(-45deg)" }}
            onClick={() => handleOperator("/")}
          />
        </CustomButton>
        <CustomButton onClick={() => handleSetNumber("7")}>7</CustomButton>
        <CustomButton onClick={() => handleSetNumber("8")}>8</CustomButton>
        <CustomButton onClick={() => handleSetNumber("9")}>9</CustomButton>
        <CustomButton className="main-action">
          <CloseOutlined onClick={() => handleOperator("*")} />
        </CustomButton>
        <CustomButton onClick={() => handleSetNumber("4")}>4</CustomButton>
        <CustomButton onClick={() => handleSetNumber("5")}>5</CustomButton>
        <CustomButton onClick={() => handleSetNumber("6")}>6</CustomButton>
        <CustomButton className="main-action">
          <MinusOutlined onClick={() => handleOperator("-")} />
        </CustomButton>
        <CustomButton onClick={() => handleSetNumber("1")}>1</CustomButton>
        <CustomButton onClick={() => handleSetNumber("2")}>2</CustomButton>
        <CustomButton onClick={() => handleSetNumber("3")}>3</CustomButton>
        <CustomButton className="main-action">
          <PlusOutlined onClick={() => handleOperator("+")} />
        </CustomButton>
        <CustomButton style={{ flex: 1 }} onClick={() => handleSetNumber("0")}>
          0
        </CustomButton>
        <CustomButton onClick={() => handleSetNumber(".")}>.</CustomButton>
        <CustomButton className="main-action" onClick={() => handleCalculate()}>
          <PauseOutlined style={{ transform: "rotate(90deg)" }} />
        </CustomButton>
      </WrapActionAndNumber>
    </Container>
  );
};

export default Calculate;

const Container = styled.div`
  position: relative;
  background-color: gray;
  border-radius: 20px;
  overflow: hidden;
`;

const BoxResult = styled.div`
  padding: 20px;
  text-align: right;
  font-size: 30px;
  color: #fff;
  border: 1px solid #695353;
`;

const WrapActionAndNumber = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  button {
    flex: 0 0 25%;
  }
`;

const CustomButton = styled(Button)`
  border-radius: 0;
  border-color: #695353;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  background-color: #2c2b2b;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  &:active,
  &:hover,
  &:focus {
    opacity: 0.5;
    color: #fff !important;
    border-color: #fff !important;
  }
  &.main-action {
    background-color: skyblue;
  }
  &.sub-action {
    background-color: #191717;
  }
`;
