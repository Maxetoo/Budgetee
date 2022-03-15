export const reducer = (state, action) => {
  //ADD ITEMS TO MAIN ARRAY [listItems]
  if (action.type === 'DATA ITEM') {
    return {
      ...state,
      listItems: action.payload,
    }
  }

  //REMOVE ITEMS ON CLICK
  if (action.type === 'REMOVE ITEM') {
    const newListItems = state.listItems.filter(
      (value) => value.id !== action.payload
    )
    return {
      ...state,
      listItems: newListItems,
      listFilteredArray: newListItems,
    }
  }

  //ADD UP TOTAL AMOUNT OF LIST ITEMS

  if (action.type === 'TOTAL EXPENSES') {
    let { amount } = state.listItems.reduce(
      (value, index) => {
        const { amount } = index
        value.amount += parseFloat(amount)
        return value
      },
      { amount: 0 }
    )
    amount = parseFloat(amount).toFixed(2)

    return {
      ...state,
      expenses: amount,
    }
  }

  //EVALUATE SAVINGS FROM WALLET VALUE - ALL EXPENSES

  if (action.type === 'SAVINGS') {
    return {
      ...state,
      savings: action.payload,
    }
  }

  //EVALUATE BUDGET-DEFICIT FROM ALL EXPENSES - WALLET VALUE

  if (action.type === 'BUDGET-DEFICIT') {
    return {
      ...state,
      budgetDeficit: action.payload,
    }
  }

  //CREATES ANOTHER ARRAY FROM THE ORIGINAL ARRAY SO AS TO ENABLE FILTERING WITHOUT CHANGING THE ORIGINAL ARRAY

  if (action.type === 'LIST-FILTRED-ARRAY') {
    return {
      ...state,
      listFilteredArray: state.listItems,
    }
  }

  //FILTER SUBORDINATE ARRAY FROM CLICK EVENT OF EACH CATEGORY ITEM

  if (action.type === 'FILTER-CATEGORY') {
    const filteredCategory = state.listItems.filter((value) => {
      return value.category === action.payload
    })
    return {
      ...state,
      listFilteredArray: filteredCategory,
    }
  }

  //RETURN ALL ITEMS FROM SUBORDINATE ARRAY

  if (action.type === 'FILTER-FOR-ALL') {
    return {
      ...state,
      listFilteredArray: state.listItems,
    }
  }

  //DYNAMICALLY ADD CATEGORY ON LIST ITEM ADD

  if (action.type === 'FILTER-ARRAY') {
    return {
      ...state,
      filterArray: action.payload,
    }
  }

  //REMOVE FILTER CATEGORY

  if (action.type === 'REMOVE-FILTER-CATEGORY') {
    const newFilterArray = state.filterArray.filter((value) => {
      return value !== action.payload
    })
    return {
      ...state,
      filterArray: newFilterArray,
    }
  }

  //CALCULATE CATEGORY SUMMARY FOR FOOD
  if (action.type === 'CATEGORY-FOOD-SUMMARY') {
    const setFoodArray = state.listItems.filter((value) => {
      return value.category === action.payload
    })
    return {
      ...state,
      categoryFoodSummary: setFoodArray,
    }
  }

  if (action.type === 'FOOD-SUMMARY') {
    let { amount } = state.categoryFoodSummary.reduce(
      (value, index) => {
        const { amount } = index
        value.amount += parseFloat(amount)
        return value
      },
      { amount: 0 }
    )
    amount = (parseFloat(amount) / state.expenses) * 100
    amount = parseFloat(amount).toFixed(2)

    return {
      ...state,
      foodSummary: amount,
    }
  }

  //CALCULATE CATEGORY SUMMARY FOR CLOTHING
  if (action.type === 'CATEGORY-CLOTHING-SUMMARY') {
    const setClothingArray = state.listItems.filter((value) => {
      return value.category === action.payload
    })
    return {
      ...state,
      categoryClothingSummary: setClothingArray,
    }
  }

  if (action.type === 'CLOTHING-SUMMARY') {
    let { amount } = state.categoryClothingSummary.reduce(
      (value, index) => {
        const { amount } = index
        value.amount += parseFloat(amount)
        return value
      },
      { amount: 0 }
    )
    amount = (parseFloat(amount) / state.expenses) * 100
    amount = parseFloat(amount).toFixed(2)

    return {
      ...state,
      clothingSummary: amount,
    }
  }

  //CALCULATE CATEGORY SUMMARY FOR SCHOOL EXPENSE
  if (action.type === 'CATEGORY-SCHOOL-EXP-SUMMARY') {
    const setSchoolExpArray = state.listItems.filter((value) => {
      return value.category === action.payload
    })
    return {
      ...state,
      categorySchoolExpSummary: setSchoolExpArray,
    }
  }

  if (action.type === 'SCHOOL-EXP-SUMMARY') {
    let { amount } = state.categorySchoolExpSummary.reduce(
      (value, index) => {
        const { amount } = index
        value.amount += parseFloat(amount)
        return value
      },
      { amount: 0 }
    )
    amount = (parseFloat(amount) / state.expenses) * 100
    amount = parseFloat(amount).toFixed(2)

    return {
      ...state,
      schoolExpSummary: amount,
    }
  }

  //CALCULATE CATEGORY SUMMARY FOR TRANSPORT
  if (action.type === 'CATEGORY-TP-SUMMARY') {
    const setTpArray = state.listItems.filter((value) => {
      return value.category === action.payload
    })
    return {
      ...state,
      categoryTpSummary: setTpArray,
    }
  }

  if (action.type === 'TP-SUMMARY') {
    let { amount } = state.categoryTpSummary.reduce(
      (value, index) => {
        const { amount } = index
        value.amount += parseFloat(amount)
        return value
      },
      { amount: 0 }
    )
    amount = (parseFloat(amount) / state.expenses) * 100
    amount = parseFloat(amount).toFixed(2)

    return {
      ...state,
      tpSummary: amount,
    }
  }

  //CALCULATE CATEGORY SUMMARY FOR BF/GF
  if (action.type === 'CATEGORY-BF/GF-SUMMARY') {
    const setBf_gfArray = state.listItems.filter((value) => {
      return value.category === action.payload
    })
    return {
      ...state,
      categoryBf_gfSummary: setBf_gfArray,
    }
  }

  if (action.type === 'BF/GF-SUMMARY') {
    let { amount } = state.categoryBf_gfSummary.reduce(
      (value, index) => {
        const { amount } = index
        value.amount += parseFloat(amount)
        return value
      },
      { amount: 0 }
    )
    amount = (parseFloat(amount) / state.expenses) * 100
    amount = parseFloat(amount).toFixed(2)

    return {
      ...state,
      bf_gfSummary: amount,
    }
  }

  //CALCULATE CATEGORY SUMMARY FOR DATA
  if (action.type === 'CATEGORY-DATA-SUMMARY') {
    const setDataArray = state.listItems.filter((value) => {
      return value.category === action.payload
    })
    return {
      ...state,
      categoryDataSummary: setDataArray,
    }
  }

  if (action.type === 'DATA-SUMMARY') {
    let { amount } = state.categoryDataSummary.reduce(
      (value, index) => {
        const { amount } = index
        value.amount += parseFloat(amount)
        return value
      },
      { amount: 0 }
    )
    amount = (parseFloat(amount) / state.expenses) * 100
    amount = parseFloat(amount).toFixed(2)

    return {
      ...state,
      dataSummary: amount,
    }
  }

  return state
}
