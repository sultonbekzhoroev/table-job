import { createContext, useState, useEffect } from "react";
import axios from "axios";

// создаю контекст
export const TableContext = createContext([]);

export const TableProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // с помощью асинхронной функции и axios зафечил данные с API который создал сам
  const callApi = async () => {
    try {
      let res = await axios.get(
        "https://mocki.io/v1/8b52a9da-49af-4899-90d0-6fbbb6de015d"
      );
      setData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Вызываю функцию внутри useEffect чтобы не вечил вечно
  useEffect(() => {
    callApi();
  }, []);
  const [filteredData, setFilteredData] = useState(null);
  //  Положил данные в контекст чтобы везде мог достать их без пропсов
  const dataTable = {
    data: data,
    setFilteredData: setFilteredData,
    filteredData: filteredData,
  };
  return (
    <TableContext.Provider value={dataTable}>{children}</TableContext.Provider>
  );
};
