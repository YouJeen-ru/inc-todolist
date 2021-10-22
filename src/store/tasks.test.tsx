import {ActionType, salaryReducer} from "./tasks";


test('Next salary (sum)', () => {
    const salary = 500
    const actionSum: ActionType = {type: 'sum', number: 100}

    expect(salaryReducer(salary, actionSum )).toBe(600)
})

test('Next salary (mult)', () => {
    const salary = 500

    expect(salaryReducer(salary, {type: 'mult', number: 2})).toBe(1000)
})

test('Next salary (div)', () => {
    expect(salaryReducer(1500, {type: 'div', number: 3})).toBe(500)
})

test('Next salary (sub)', () => {
    const salary = 1500
    const result = salaryReducer(salary, {type: 'sub', number: 200})

    expect(result).toBe(1300)
})

