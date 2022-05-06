import "./FormTable.scss";
import { useState, useContext } from "react";
import { TableContext } from "../../context/Context";
function FormTable() {
  // здесь создал состояние внутри которого есть объект в которой я сохроняю содержимость трех колонок
  const [filter, setFilter] = useState({
    field: "",
    condition: "",
    term: "",
  });
  //  тут получаю данные которые я зафечил и стейт куда отправляются данные которые пройдут условия фильтраций с моего стора
  const { data, setFilteredData } = useContext(TableContext);

  // Создана функция фильтраций
  const handleFilter = (e) => {
    e.preventDefault();
    if (filter.term.length === 0) {
      alert("fill the inputs");
    }
    let fieldOption = filter.field;
    let condition;
    const newData = data.filter((item) => {
      if (filter.condition === "equal") {
        condition = item[fieldOption] === filter.term;
      } else if (filter.condition === "contain") {
        condition = item[fieldOption]
          .toLowerCase()
          .includes(filter.term.toLowerCase());
      } else if (filter.condition === "greater") {
        condition = item[fieldOption] > filter.term;
      } else if (filter.condition === "less") {
        condition = item[fieldOption] < filter.term;
      }

      if (condition) {
        return item;
      }
    });
    setFilteredData(newData);
  };

  // это функция сброса
  const handleReset = (e) => {
    e.preventDefault();
    setFilteredData(null);
    setFilter({
      field: "",
      condition: "",
      term: "",
    });
  };

  return (
    <div className="form-table">
      <form>
        <select
          // Тут указав валю контролирую инпут
          value={filter.field}
          onChange={(e) => setFilter({ ...filter, field: e.target.value })}
          required
        >
          <option value="">Поле...</option>
          <option value="name">Название</option>
          <option value="quantity">Количество</option>
          <option value="distance">Расстояние</option>
        </select>
        <select
          value={filter.condition}
          onChange={(e) => setFilter({ ...filter, condition: e.target.value })}
          required
        >
          <option value="">Условие...</option>
          <option value="equal">Равно</option>
          <option value="contain">Содержит</option>
          <option value="greater">Больше</option>
          <option value="less">Меньше</option>
        </select>
        <input
          value={filter.term}
          onChange={(e) => setFilter({ ...filter, term: e.target.value })}
          type="text"
          placeholder="Значение"
          required
        />
        <button
          onClick={(e) => {
            handleReset(e);
          }}
        >
          Сброс
        </button>
        <button type="submit" onClick={(e) => handleFilter(e)}>
          Фильтр
        </button>
      </form>
    </div>
  );
}

export default FormTable;
