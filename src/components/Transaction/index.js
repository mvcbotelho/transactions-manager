import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import "./style.css";

const transaction = props => {
  const [valueInput, setValueInput] = useState("");
  const [description, setDescription] = useState("");

  let classes = ["field"];

  if (props.visible) classes.push("visible");
  else classes.push("hidden");

  const clickedButtonHandler = type => {
    props.confirmTransaction(type, valueInput, description);
    setValueInput("");
    setDescription("");
  };

  return (
    <div className={classes.join(" ")}>
      <Input
        type="number"
        changed={e => setValueInput(e.target.value)}
        value={valueInput}
      >
        Valor:
      </Input>
      <Input
        changed={e => setDescription(e.target.value)}
        value={description}
        maxLength={50}
      >
        Descrição:
      </Input>
      <Button icon="check" clicked={() => clickedButtonHandler("ok")}>
        Cadastrar
      </Button>
      <Button
        icon="cancel"
        color="var(--neg-color)"
        clicked={() => clickedButtonHandler("cancel")}
      >
        Cancelar
      </Button>
    </div>
  );
};

export default transaction;
