import "./Table.scss";
import { useContext, useState } from "react";
import { TableContext } from "../../context/Context";
function Table() {
  //   Получаю данные с контекста
  const { data, filteredData } = useContext(TableContext);

  const [currentPage, setCurrentPage] = useState(0);

  const dataToRender = filteredData !== null ? filteredData : data;

  //   организация пагинаций
  const elementsPerPage = 4;
  const start = currentPage * elementsPerPage;
  const end = start + elementsPerPage;
  const pages = Math.ceil(dataToRender.length / elementsPerPage);
  const btn = new Array(pages).fill("div");
  const dataPerPage = dataToRender.slice(start, end);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Название</th>
            <th>Количество</th>
            <th>Расстояние</th>
          </tr>
        </thead>

        <tbody>
          {dataPerPage?.map((user, index) => (
            <tr key={index}>
              <td>{user.date}</td>
              <td>{user.name}</td>
              <td>{user.quantity}</td>
              <td>{user.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="block-btn">
        {btn.map((button, index) => {
          return (
            <button
              className={currentPage === index ? "active btn" : "btn"}
              onClick={() => setCurrentPage(index)}
              key={index + currentPage}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
