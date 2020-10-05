import React, { useState } from "react";
import { DatePicker, Button } from "antd";
import moment from "moment";
import "./style.scss";

const { RangePicker } = DatePicker;

const HistoricalRates = (props: any) => {
  const { history } = props;
  // eslint-disable-next-line
  const [dates, setDates] = useState<[string | null, string | null] | null>([
    null,
    null,
  ]);

  const disabledDate = (current: any) => {
    return current && current > moment(new Date(), "YYYY-MM-DD");
  };

  return (
    <>
      <div className="wrap-picker">
        <RangePicker
          disabledDate={disabledDate}
          format="YYYY-MM-DD"
          defaultValue={[moment("2020-01-01"), moment(new Date())]}
          onChange={(e, formated) => setDates(formated)}
        />
        <Button type="primary">Load historical rates</Button>
      </div>

      <div>
        {history &&
          history.map((el: any) => (
            <div className="wrap-date" key={el.value.toString()}>
              <div>{el.date}</div>
              <div>{el.value}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default HistoricalRates;
