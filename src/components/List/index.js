import React from "react";
import style from "./style.css";

const list = props => {
  let transactions = [];
  let date = null;
  let printDate;
  let classes = [style.list];

  if (props.visible) classes.push(style.visible);
  else classes.push(style.hidden);

  if (props.transactions) {
    transactions = [...props.transactions];
    transactions.reverse();
  }

  return (
    <main>
      <div className={classes.join(" ")}>
        <h2 className="title">Lista de Transações</h2>
        <dl>
          {transactions.map((t, index) => {
            // group by dates
            if (date !== new Date(t.date).toLocaleDateString()) {
              date = new Date(t.date).toLocaleDateString();
              printDate = (
                <dt className="date">
                  {new Date(t.date).toLocaleDateString()}
                </dt>
              );
            } else printDate = null;

            return (
              <React.Fragment key={index}>
                {printDate}
                <dd
                  style={{
                    color:
                      t.type === "deposit"
                        ? "var(--pos-color)"
                        : "var(--neg-color)"
                  }}
                  className="desc"
                >
                  {t.description}{" "}
                  <strong>
                    {t.type === "deposit" ? "+" : "-"} R${" "}
                    {t.value.toLocaleString("pt-br", {
                      minimumFractionDigits: 2
                    })}
                  </strong>
                </dd>
              </React.Fragment>
            );
          })}
        </dl>
      </div>
    </main>
  );
};

export default list;
