import React, { useContext, useState, useEffect, useReducer } from 'react'
import { reducer } from './reducer'
import { imageData } from './data/data'
const appProvider = React.createContext()

//FUNCTION FOR LOCALSTORAGE MAIN LOG-IN LOGIC
const setLocalStorage = () => {
  const loginItem = localStorage.getItem('isLoggedIn')
  if (loginItem) {
    return localStorage.getItem('isLoggedIn')
  } else {
    return null
  }
}

//FUNCTION TO ADD LOGIN NAME TO LOCALSTORAGE
const setValueStorage = () => {
  const loginValueItem = localStorage.getItem('loginValue')
  if (loginValueItem) {
    return localStorage.getItem('loginValue')
  } else {
    return ''
  }
}

//FUNCTION TO ADD WALLET VALUE TO LOCALSTORAGE
const setWalletValueStorage = () => {
  const walletValueItem = localStorage.getItem('walletValue')
  if (walletValueItem) {
    return localStorage.getItem('walletValue')
  } else {
    return ''
  }
}

//FUNCTION TO ADD MAIN EXPENSES ARRAY TO LOCALSTRAGE
const setItemListStorage = () => {
  const listExpenseItem = localStorage.getItem('listExpenseItem')
  if (listExpenseItem) {
    return JSON.parse(localStorage.getItem('listExpenseItem'))
  } else {
    return []
  }
}

//FUNCTION TO ADD COMPLEMENT MAIN EXPENSES ARRAY TO LOCALSTORAGE
const setFilterListStorage = () => {
  const listFilterItem = localStorage.getItem('listFilterArray')
  if (listFilterItem) {
    return JSON.parse(localStorage.getItem('listFilterArray'))
  } else {
    return []
  }
}

//FUNCTION TO ADD EACH FILTER CATEGORY TO LOCALSTORAGE
const setListLocalStorage = () => {
  const listLocalItem = localStorage.getItem('listLocalItem')
  if (listLocalItem) {
    return JSON.parse(localStorage.getItem('listLocalItem'))
  } else {
    return []
  }
}
const otherItems = {
  listItems: setListLocalStorage(),
  listFilteredArray: setItemListStorage(),
  filterArray: setFilterListStorage(),
  expenses: 0,
  savings: 0,
  budgetDeficit: 0,
  categoryFoodSummary: [],
  categoryClothingSummary: [],
  categorySchoolExpSummary: [],
  categoryTpSummary: [],
  categoryBf_GfSummary: [],
  categoryDataSummary: [],
  foodSummary: 0,
  clothingSummary: 0,
  schoolExpSummary: 0,
  tpSummary: 0,
  bf_gfSummary: 0,
  dataSummary: 0,
}

const AppContext = ({ children }) => {
  const [walletMainValue, setWalletMainValue] = useState(
    setWalletValueStorage()
  )
  const [addEntryValues, setAddEntryValues] = useState({
    amount: '',
    category: 'food',
    description: '',
  })

  const [item, setItem] = useReducer(reducer, otherItems)
  const [isInputCorrect, setIsInputCorrect] = useState(true)
  const [loginValue, setLoginValue] = useState(setValueStorage())
  const [isMarker, setIsMarker] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(setLocalStorage())
  const [helpIcon, setHelpIcon] = useState(false)
  const [walletAmount, setWalletAmount] = useState(false)
  const [isExpenseContainer, setIsExpenseContainer] = useState(false)
  const [summaryDetails, setSummaryDetails] = useState([])
  const [listEmpty, setListEmpty] = useState(false)
  const [expensesAdded, setExpenseAdded] = useState({
    correct: false,
    display: false,
  })

  //FUNCTION TO HANDLE MAIN LOGIN ACTION
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (isInputCorrect) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  //USEEFFECT TO MONITOR IF USER INPUTS THE REQUIRED INPUTS IN THE LOGIN FORM
  useEffect(() => {
    if (loginValue === '') {
      setIsMarker(false)
    } else {
      setIsMarker(true)
    }
  }, [loginValue])

  //USEEFFECT TO CHECK IF USER INPUTS MATCHES REQUIREMENTS

  useEffect(() => {
    const regex = /^[A-Za-z]\S/
    if (
      regex.test(loginValue) &&
      loginValue.length >= 3 &&
      loginValue.length <= 9
    ) {
      setIsInputCorrect(true)
    } else {
      setIsInputCorrect(false)
    }
  }, [loginValue])

  //USEEFFECT TO CHECK IF AND NOT IF TO DISPLAY THE HELP OPTION IN THE MAIN LOGIN FORM

  useEffect(() => {
    if (isMarker && !isInputCorrect) {
      setHelpIcon(true)
    } else {
      setHelpIcon(false)
    }
  }, [isMarker, isInputCorrect])

  //USEEFFECT TO SET LOGGIN VALUE TO WHICH IF USER IS LOGGED IN

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', isLoggedIn)
    }
  }, [isLoggedIn])

  //USEEFFECT TO SET LOGINVALUE AFTER USER HAS LOGGED IN

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('loginValue', loginValue)
    }
  }, [isLoggedIn, loginValue])

  //USEEFFECT TO SET WALLET VALUE FROM THE WALLET PAGE

  useEffect(() => {
    localStorage.setItem('walletValue', walletMainValue)
  }, [walletMainValue])

  //SUBMIT FUNCTION TO SET WALLET VALUE FROM FORM

  const handleSubmitWalletVal = (e) => {
    e.preventDefault()
    if (walletMainValue && walletMainValue.length < 10) {
      setWalletMainValue(parseFloat(walletMainValue).toFixed(2))
      setWalletAmount(false)
    }
  }

  //FUNCTION TO ADD AND REMOVE SET WALLET FORM CONTAINER
  const handleAddExpenseCont = (e) => {
    e.preventDefault()
    if (isExpenseContainer) {
      setIsExpenseContainer(false)
    } else {
      setIsExpenseContainer(true)
    }
  }

  //FUNCTION TO ADD EXPENSE VALUES IF REQUIREMENTS ARE MET

  const handleAddExpenseValues = (entryValues) => {
    if (
      addEntryValues.amount &&
      addEntryValues.category &&
      addEntryValues.description &&
      addEntryValues.description.length <= 30 &&
      addEntryValues.amount.length <= 8
    ) {
      setItem({ type: 'DATA ITEM', payload: [...item.listItems, entryValues] })
      setItem({
        type: 'FILTER-ARRAY',
        payload: [...item.filterArray, entryValues.category],
      })
      setItem({ type: 'LIST-FILTRED-ARRAY' })
      setExpenseAdded(() => {
        return { correct: true, display: true }
      })

      setAddEntryValues({
        amount: '',
        category: 'food',
        description: '',
      })
    } else {
      setExpenseAdded(() => {
        return { correct: false, display: true }
      })
    }
  }

  //USEEFFECT FOR MESSAGE ALERT
  useEffect(() => {
    if (expensesAdded.display) {
      const timer = setTimeout(() => {
        setExpenseAdded(() => {
          return { correct: false, display: false }
        })
      }, 1300)

      return () => clearTimeout(timer)
    }
  }, [expensesAdded])

  useEffect(() => {
    console.log(expensesAdded)
  }, [expensesAdded])

  //FUNCTION TO DELETE ADDED EXPENSE LIST THROUGH ID

  const handleDeleteItem = (id, category) => {
    setItem({ type: 'REMOVE ITEM', payload: id })
    setItem({
      type: 'REMOVE-FILTER-CATEGORY',
      payload: category,
    })
  }

  //FUNCTION TO FILTER ADDED EXPENSE LIST THROUGH EACH CATEGORY

  const filterCategory = (category) => {
    if (category === 'All') {
      setItem({ type: 'FILTER-FOR-ALL' })
    } else {
      setItem({ type: 'FILTER-CATEGORY', payload: category })
    }
  }

  //USEEFECT TO CALCULATE THE SUM TOTAL OF ALL ADDED EXPENSES

  useEffect(() => {
    setItem({ type: 'TOTAL EXPENSES' })
  }, [item.listItems])

  //USEEFFECT TO CALCULATE THE SUM TOTAL OF ALL SAVINGS IF WALLET VALUE IS GREATER THAN TOTAL EXPENSES
  useEffect(() => {
    let savings
    let expenses = parseFloat(item.expenses)
    let walletValue = parseFloat(walletMainValue)
    if (walletValue > expenses) {
      savings = walletValue - expenses
      savings = savings.toFixed(2)
      setItem({ type: 'SAVINGS', payload: savings })
    } else {
      setItem({ type: 'SAVINGS', payload: '0.00' })
    }
  }, [item.expenses, walletMainValue])

  //USEEFECT TO CALCULATE BUDGET DEFICIT IF TOTAL EXPENSES IS GREATER THAN WALLET VALUE

  useEffect(() => {
    let expenses = parseFloat(item.expenses)
    let walletValue = parseFloat(walletMainValue)
    if (expenses > walletValue) {
      let budgetDeficit = expenses - walletValue
      budgetDeficit = budgetDeficit.toFixed(2)
      setItem({ type: 'BUDGET-DEFICIT', payload: budgetDeficit })
    } else {
      setItem({ type: 'BUDGET-DEFICIT', payload: '0.00' })
    }
  }, [walletMainValue, item.expenses])

  //ARRAY FOR FILTERED SUMMARY LIST
  useEffect(() => {
    setItem({ type: 'CATEGORY-FOOD-SUMMARY', payload: 'food' })
    setItem({ type: 'CATEGORY-CLOTHING-SUMMARY', payload: 'clothing' })
    setItem({ type: 'CATEGORY-SCHOOL-EXP-SUMMARY', payload: 'school-expense' })
    setItem({ type: 'CATEGORY-TP-SUMMARY', payload: 'tp' })
    setItem({ type: 'CATEGORY-BF/GF-SUMMARY', payload: 'bf/gf' })
    setItem({ type: 'CATEGORY-DATA-SUMMARY', payload: 'data' })
  }, [item.listItems])

  //USEEFFECT TO CALCULATE THE ADDITION OF FILTERED SUMMARY LIST CATEGORY
  useEffect(() => {
    setItem({ type: 'FOOD-SUMMARY' })
    setItem({ type: 'CLOTHING-SUMMARY' })
    setItem({ type: 'SCHOOL-EXP-SUMMARY' })
    setItem({ type: 'TP-SUMMARY' })
    setItem({ type: 'BF/GF-SUMMARY' })
    setItem({ type: 'DATA-SUMMARY' })
  }, [item.expenses, item.listItems])

  useEffect(() => {
    localStorage.setItem(
      'listExpenseItem',
      JSON.stringify(item.listFilteredArray)
    )
  }, [item.listFilteredArray])

  useEffect(() => {
    localStorage.setItem('listFilterArray', JSON.stringify(item.filterArray))
  }, [item.filterArray])

  useEffect(() => {
    localStorage.setItem('listLocalItem', JSON.stringify(item.listItems))
  }, [item.listItems])

  //USEEFECT TO ORGANISE THE SUMMARY OF ALL EXPENSES AND PERCENTAGE OF EACH EXPENSE ITEM CATEGORY
  useEffect(() => {
    let analysis = [
      {
        id: 0,
        image: imageData.food,
        category: 'Food',
        percentage: item.foodSummary,
        totalValue: Math.round((item.foodSummary * item.expenses) / 100),
      },
      {
        id: 1,
        image: imageData.clothing,
        category: 'Clothing',
        percentage: item.clothingSummary,
        totalValue: Math.round((item.clothingSummary * item.expenses) / 100),
      },
      {
        id: 2,
        image: imageData['school-expense'],
        category: 'Sch-Exp',
        percentage: item.schoolExpSummary,
        totalValue: Math.round((item.schoolExpSummary * item.expenses) / 100),
      },
      {
        id: 3,
        image: imageData.tp,
        category: 'Transport',
        percentage: item.tpSummary,
        totalValue: Math.round((item.tpSummary * item.expenses) / 100),
      },
      {
        id: 4,
        image: imageData['bf/gf'],
        category: 'Bf/Gf',
        percentage: item.bf_gfSummary,
        totalValue: Math.round((item.bf_gfSummary * item.expenses) / 100),
      },
      {
        id: 5,
        image: imageData.data,
        category: 'Data',
        percentage: item.dataSummary,
        totalValue: Math.round((item.dataSummary * item.expenses) / 100),
      },
    ]

    setSummaryDetails(() => {
      return analysis.sort((a, b) => b.value - a.value)
    })
  }, [item.expenses, item.listItems])

  //USEEFFECT TO CHECK IF MAIN EXPENSE ARRAY IS EMPTY

  useEffect(() => {
    if (item.listItems.length < 1) {
      setListEmpty(true)
    } else {
      setListEmpty(false)
    }
  }, [item.listItems])

  return (
    <appProvider.Provider
      value={{
        ...item,
        isInputCorrect,
        isMarker,
        loginValue,
        isLoggedIn,
        helpIcon,
        walletMainValue,
        walletAmount,
        isExpenseContainer,
        setIsExpenseContainer,
        setWalletAmount,
        setWalletMainValue,
        setLoginValue,
        handleLoginSubmit,
        handleSubmitWalletVal,
        handleAddExpenseCont,
        handleAddExpenseValues,
        addEntryValues,
        setAddEntryValues,
        handleDeleteItem,
        filterCategory,
        summaryDetails,
        listEmpty,
        expensesAdded,
      }}
    >
      {children}
    </appProvider.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(appProvider)
}
export { appProvider, AppContext }
