import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Converter from "../../components/converter";
import HistoricalRates from "../../components/HistoricalRates";
import "./style.scss";

const Home = () => {
  const [exchange, setExchange] = useState<any>(null);
  const [history, setHistory] = useState<any>(null);

  useEffect(() => {
    axios
      .get(
        `https://api.exchangeratesapi.io/latest?base=GBP&symbols=USD,EUR,SGD`
      )
      .then((res) => {
        const data = res.data;
        setExchange(data);
      });
    loadHistory("USD");
    // eslint-disable-next-line
  }, []);

  const loadHistory = useCallback((symbols: any) => {
    let formated: any = [];
    axios
      .get(
        `https://api.exchangeratesapi.io/history?start_at=2020-09-01&end_at=2020-10-05&base=GBP&symbols=${symbols}`
      )
      .then((res) => {
        const data2 = res.data;
        console.log(data2);
        Object.entries(data2.rates).forEach((s: any) => {
          formated.push({ date: s[0], value: s[1]["USD"] });
        });
        console.log(formated);
        setHistory(formated.sort((a: any, b: any) => a.date - b.date));
      });
  }, []);

  return (
    <div>
      <div className="h1">GBP CONVERTER </div>
      <Converter exchange={exchange} />
      <HistoricalRates history={history} />
    </div>
  );
};

export default Home;
