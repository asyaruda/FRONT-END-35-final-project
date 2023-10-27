import { useSearchParams } from "react-router-dom";
import { Button } from "antd";

export function Filters () {
  let [, setSearchParams] = useSearchParams();

  const onFilterBtnClick = (filter) => {
    setSearchParams(`filter=${filter}&page=1`);
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <Button onClick={() => onFilterBtnClick('all')}>All</Button>
      <Button onClick={() => onFilterBtnClick('free')} style={{ marginLeft: '20px' }}>Free</Button>
      <Button onClick={() => onFilterBtnClick('reserved')} style={{ marginLeft: '20px' }}>Reserved</Button>
    </div>
  )
}