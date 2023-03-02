// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteList} = props
  const {type, id, amount, title} = transactionDetails
  const finalType = type === 'income' ? 'Income' : 'Expenses'
  const onDeleteClicked = () => {
    onDeleteList(id, type, amount)
  }

  return (
    <li className="li-container-list">
      <p className="type-columns">{title}</p>
      <p className="type-columns">{amount}</p>
      <p className="type-columns">{finalType}</p>
      <button
        onClick={onDeleteClicked}
        className="delete-button"
        data-testid="delete"
        type="button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="delete-img"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
