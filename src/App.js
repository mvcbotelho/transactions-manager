import React, { Component } from "react";
import "./App.css";
import Logo from "./assets/Logo/logo.png";
import Button from "./components/Button";
import List from "./components/List";
import Transaction from "./components/Transaction";

class App extends Component {
  state = {
    transactions: [],
    balance: 0,
    type: "",
    showTransactions: false,
    showList: false
  };

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem("transactionState"));

    if (storage) {
      this.setState({
        ...this.state,
        transactions: [...storage.transactions],
        balance: storage.balance
      });
    }
  }

  buttonClickedHandler = type => {
    this.setState({ showTransactions: true, type: type });
  };

  confirmTransactionHandler = (type, value, desc) => {
    let newTransaction = [...this.state.transactions];
    let newBalance = this.state.balance;

    if (type === "ok") {
      if (value === "" || desc === "") {
        alert("Por favor, preencha todos os campos"); // TODO - customize this
        return;
      }

      value = parseInt(value);

      if (this.state.type === "deposit") {
        newBalance += value;
        newTransaction.push({
          value: value,
          description: desc,
          date: new Date(),
          type: this.state.type
        });
      } else if (this.state.type === "withdraw") {
        newBalance -= value;
        newTransaction.push({
          value: value,
          description: desc,
          date: new Date(),
          type: this.state.type
        });
      }
    }
    this.setState(
      {
        ...this.state,
        transactions: newTransaction,
        balance: newBalance,
        showTransactions: false
      },
      () => localStorage.setItem("transactionState", JSON.stringify(this.state))
    );
  };

  btnListClickedHandler = () => {
    this.setState({ ...this.state, showList: !this.state.showList });
  };

  render() {
    return (
      <main className="grid">
        <div className="app">
          <div className="logo-container">
            <img src={Logo} className="logo" />
          </div>
          <h1>
            <span style={{ color: "var(--text-color)" }}>Manager</span>
          </h1>
          <div style={{ marginTop: "1rem" }}>
            <span>Saldo:</span>
            <p className="balance">
              {"R$ " +
                this.state.balance.toLocaleString("pt-br", {
                  minimumFractionDigits: 2
                })}
            </p>
          </div>
          <Transaction
            visible={this.state.showTransactions}
            confirmTransaction={this.confirmTransactionHandler}
          />

          <div className="buttons">
            <div className="row">
              <Button
                icon="plus"
                clicked={() => this.buttonClickedHandler("deposit")}
              >
                Crédito
              </Button>
              <Button
                icon="minus"
                color="var(--neg-color)"
                clicked={() => this.buttonClickedHandler("withdraw")}
              >
                Débito
              </Button>
            </div>
          </div>
        </div>
        <div className="app">
          <List
            visible={this.state.showList}
            transactions={this.state.transactions}
          />
        </div>
      </main>
    );
  }
}

export default App;
