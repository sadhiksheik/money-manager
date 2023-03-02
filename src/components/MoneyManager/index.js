import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    transactionsList: [],
    title: '',
    amount: '',
    type: 'income',
  }

  onDeleteList = (id, type, amount) => {
    const {transactionsList} = this.state
    const deletedList = transactionsList.filter(each => each.id !== id)
    this.setState({transactionsList: deletedList})

    if (type === 'income') {
      this.setState(prevState => ({
        income: prevState.income - parseInt(amount),
      }))

      this.setState(prevState => ({
        balance: prevState.balance - parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance + parseInt(amount),
      }))

      this.setState(prevState => ({
        expenses: prevState.expenses - amount,
      }))
    }
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      amount: '',
      type: 'income',
    }))

    if (type === 'income') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amount),
      }))

      this.setState(prevState => ({
        balance: prevState.balance + parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(amount),
      }))

      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amount),
      }))
    }
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amount: event.target.value})
  }

  render() {
    const {
      balance,
      income,
      expenses,
      transactionsList,
      title,
      amount,
      type,
    } = this.state
    return (
      <div className="bg-container">
        <div className="header-container">
          <h1 className="main-heading">hi, Richard</h1>
          <p className="main-para">
            Welcome back to your <span className="span">Money Manager</span>{' '}
          </p>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />

        <div className="transactions-container">
          <form className="form-container" onSubmit={this.onAddTransaction}>
            <h1 className="form-heading">Add Transaction</h1>
            <label className="label" htmlFor="titleId">
              TITLE
            </label>
            <br />
            <input
              type="text"
              value={title}
              id="titleId"
              placeholder="TITLE"
              onChange={this.onTitleChange}
            />
            <br />

            <label className="label" htmlFor="amountId">
              AMOUNT
            </label>
            <br />
            <input
              type="text"
              value={amount}
              id="amountId"
              placeholder="AMOUNT"
              onChange={this.onAmountChange}
            />
            <br />

            <label className="label" htmlFor="dropdownId">
              TYPE
            </label>

            <select id="dropdownId" onChange={this.onChangeType} value={type}>
              {transactionTypeOptions.map(eachType => (
                <option value={eachType.optionId}>
                  {eachType.displayText}
                </option>
              ))}
            </select>

            <button className="button" type="submit">
              Add
            </button>
          </form>

          <div className="details-container">
            <h1 className="form-heading">History</h1>

            <ul className="ul-lists">
              <li className="types-heading">
                <p className="type-columns">Title</p>
                <p className="type-columns">Amount</p>
                <p className="type-columns">Type</p>
              </li>
              {transactionsList.map(eachContact => (
                <TransactionItem
                  key={eachContact.id}
                  transactionDetails={eachContact}
                  onDeleteList={this.onDeleteList}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
