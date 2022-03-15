import React from 'react'
import { FaPen, FaTimes, FaPlus, FaCheck } from 'react-icons/fa'
import { useGlobalContext } from '../../context'
import List from '../list/addExpenseList'
import { imageData } from '../../data/data'
const AddPage = () => {
  const {
    isExpenseContainer,
    handleAddExpenseCont,
    addEntryValues,
    setAddEntryValues,
    handleAddExpenseValues,
    filterArray,
    filterCategory,
    listFilteredArray,
    expensesAdded,
  } = useGlobalContext()

  const mainFilterArray = ['All', ...new Set(filterArray)]

  const handleExpenseChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAddEntryValues({ ...addEntryValues, [name]: value })
  }

  const entryValues = {
    id: new Date().getTime().toString(),
    timeMoment: new Date().toLocaleString(),
    ...addEntryValues,
  }

  return (
    // MAIN ADD PAGE
    <div className='add-page-section'>
      <h3 className='add-list'>Add Entry</h3>
      <div className='list-filter-container'>
        {mainFilterArray.map((value, index) => {
          return (
            <div
              className='list-filter'
              key={index}
              onClick={() => filterCategory(value)}
            >
              {value.charAt(0).toUpperCase() +
                value.split('').slice(1).join('')}
            </div>
          )
        })}
      </div>
      <div className='create-expense-main-cont'>
        <div className='create-expense-cont' onClick={handleAddExpenseCont}>
          <p className='expense-add-icon'>
            <FaPlus />
          </p>
          <h3 className='expense-create-text'>New Entry</h3>
        </div>
      </div>
      {/* EXPENSE LIST CONTAINER */}
      <div className='list-expense-container'>
        {listFilteredArray.map((value) => {
          return (
            <List
              key={value.id}
              image={imageData[value.category]}
              time={value.timeMoment}
              {...value}
            />
          )
        })}
      </div>
      {/* ADD EXPENSE CONTAINER  */}
      {isExpenseContainer && (
        <div className='add-expense-container'>
          {/* ADD CONTAINER FOR ADD EXPENSE  */}
          <div className='add-expense-inputContainer'>
            {/* MAIN FORM FOR ADDD EXPENSE  */}
            <form
              autoComplete='off'
              className='expense-form'
              onSubmit={(e) => {
                e.preventDefault()
                return handleAddExpenseValues(entryValues)
              }}
            >
              {/* AMOUNT  */}
              <h3 className='expense-amount-name'>Amount:</h3>
              <input
                autoComplete='false'
                type='number'
                className='expense-input'
                placeholder='Amount'
                name='amount'
                value={addEntryValues.amount}
                min='0'
                max='100000000'
                onChange={handleExpenseChange}
              />
              {/* CATEGORY  */}
              <h3 className='expense-amount-name'>Category:</h3>
              <select
                className='expense-input'
                name='category'
                value={addEntryValues.category}
                onChange={handleExpenseChange}
              >
                <option value='food'>Food</option>
                <option value='clothing'>Clothing</option>
                <option value='school-expense'>School Expense</option>
                <option value='tp'>Transport</option>
                <option value='bf/gf'>Bf/Gf</option>
                <option value='data'>Data</option>
              </select>
              {/* DESCRIPTION  */}
              <h3 className='expense-amount-name'>Description:</h3>
              <input
                autoComplete='false'
                type='text'
                className='expense-input expense-desc'
                placeholder='Short Caption'
                name='description'
                spellCheck='false'
                value={
                  addEntryValues.description.charAt(0).toUpperCase() +
                  addEntryValues.description.split('').slice(1).join('')
                }
                onChange={handleExpenseChange}
              />
              {/* SUBMIT BTN  */}
              <div className='submit-expense-container'>
                <button
                  type='submit'
                  className='expense-sumbit-btn'
                  onClick={(e) => {
                    e.preventDefault()
                    return handleAddExpenseValues(entryValues)
                  }}
                >
                  proceed
                </button>
              </div>
            </form>
          </div>
          {expensesAdded.display && (
            <div
              className={`alert-message-cont ${
                expensesAdded.correct ? `alert-success` : `alert-wrong`
              }`}
            >
              <p className='alert-message'>
                {expensesAdded.correct ? 'Item Added' : 'Wrong Format'}
              </p>
              <p className='alert-msg-icon'>
                {expensesAdded.correct ? <FaCheck /> : <FaTimes />}
              </p>
            </div>
          )}
        </div>
      )}
      {/* wallet add  */}
      <div className='expense-add-iconBtn' onClick={handleAddExpenseCont}>
        {isExpenseContainer ? <FaTimes /> : <FaPen />}
      </div>
    </div>
  )
}

export default AddPage
